const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const downloadQueue = require('./download-queue');
const { espacio, verificarEspacio } = require('./storage');

function getYtdlp() {
    const local = path.join(process.cwd(), 'yt-dlp');
    if (fs.existsSync(local)) return local;
    return 'yt-dlp';
}

let _hayAria2 = null;
function hayAria2() {
    if (_hayAria2 === null) {
        try {
            execFileSync('aria2c', ['--version'], { stdio: 'ignore', timeout: 5000 });
            _hayAria2 = true;
        } catch (e) {
            _hayAria2 = false;
        }
    }
    return _hayAria2;
}

function argsComunes() {
    return [
        '--no-update',
        '--no-warnings',
        '--no-playlist',
        '--socket-timeout', '30',
        '--retries', '3'
    ];
}

function argsDescargador() {
    if (!hayAria2()) return [];
    return [
        '--downloader', 'aria2c',
        '--downloader-args', 'aria2c:-x 16 -s 16 -k 1M --file-allocation=none --console-log-level=error'
    ];
}

function ejecutarYtdlp(args, timeoutMs = 240000, { job = null, onProgress = null } = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(getYtdlp(), args, {
            detached: true,
            stdio: ['ignore', 'pipe', 'pipe']
        });
        if (job) downloadQueue.registrarProceso(job, child, { grupo: true });

        let stdout = '';
        let stderr = '';
        let ultimoPct = -1;
        let ultimoEnvio = 0;
        let terminado = false;

        const leer = (trozo, esError) => {
            const texto = trozo.toString();
            if (esError) stderr = (stderr + texto).slice(-64 * 1024);
            else stdout = (stdout + texto).slice(-64 * 1024);
            const m = texto.match(/(\d{1,3}(?:\.\d+)?)%/);
            if (!m) return;
            const pct = Math.max(0, Math.min(100, Math.floor(Number(m[1]))));
            const ahora = Date.now();
            if (pct === ultimoPct || (pct < ultimoPct + 10 && ahora - ultimoEnvio < 8000 && pct !== 100)) return;
            ultimoPct = pct;
            ultimoEnvio = ahora;
            try { job?.reportar?.(pct, 'descargando'); } catch {}
            if (onProgress) {
                try {
                    const r = onProgress(pct);
                    if (r?.catch) r.catch(() => {});
                } catch {}
            }
        };

        child.stdout?.on('data', t => leer(t, false));
        child.stderr?.on('data', t => leer(t, true));

        const matar = (senal) => {
            try { child.kill(senal); } catch {}
            try { if (child.pid) process.kill(-child.pid, senal); } catch {}
        };

        const timer = setTimeout(() => matar('SIGTERM'), timeoutMs);
        timer.unref?.();

        const abort = () => matar('SIGTERM');
        if (job?.abortController?.signal) {
            if (job.abortController.signal.aborted) abort();
            else job.abortController.signal.addEventListener('abort', abort, { once: true });
        }

        child.on('error', err => {
            if (terminado) return;
            terminado = true;
            clearTimeout(timer);
            reject(err);
        });

        child.on('close', code => {
            if (terminado) return;
            terminado = true;
            clearTimeout(timer);
            if (job?.abortController?.signal?.aborted) return reject(new Error('Descarga cancelada.'));
            if (code === 0) return resolve(stdout);
            reject(new Error((stderr || stdout || `yt-dlp terminó con código ${code}`).trim().slice(-400)));
        });
    });
}

async function ejecutarDescarga(args, timeoutMs, opts = {}) {
    if (hayAria2()) {
        try {
            return await ejecutarYtdlp([...argsComunes(), ...argsDescargador(), ...args], timeoutMs, opts);
        } catch (e) {
            console.log('⚠️ aria2c falló, reintentando sin aria2c:', e.message.slice(0, 120));
        }
    }
    return await ejecutarYtdlp([...argsComunes(), ...args], timeoutMs, opts);
}

function esUrlYouTube(texto) {
    return /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\//i.test(texto);
}

function extraerTitulo(salida, respaldo) {
    const lineas = String(salida || '')
        .split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('['));
    return lineas.pop() || respaldo;
}

async function descargarAudio(entrada, timeoutMs = 240000, opts = {}) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'audio_'));
    try {
        const objetivo = esUrlYouTube(entrada) ? entrada : `ytsearch1:${entrada}`;
        const salida = await ejecutarDescarga([
            '-f', 'bestaudio[ext=m4a]/bestaudio/best',
            '-x', '--audio-format', 'm4a', '--audio-quality', '0',
            '--max-filesize', '100M',
            '--no-simulate',
            '--print', 'after_move:%(title)s',
            '-o', path.join(dir, '%(id)s.%(ext)s'),
            objetivo
        ], timeoutMs, opts);

        const archivo = fs.readdirSync(dir).find(f => !f.endsWith('.part'));
        if (!archivo) throw new Error('No se pudo descargar el audio');

        const buffer = fs.readFileSync(path.join(dir, archivo));
        if (!buffer.length) throw new Error('El archivo descargado está vacío');

        return {
            buffer,
            titulo: extraerTitulo(salida, esUrlYouTube(entrada) ? 'Audio de YouTube' : entrada),
            tamanoMB: (buffer.length / 1024 / 1024).toFixed(2)
        };
    } finally {
        try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {}
    }
}

async function descargarVideoArchivo(entrada, timeoutMs = 240000, opts = {}) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'video_'));
    try {
        const libre = espacio().libre;
        verificarEspacio(350 * 1024 * 1024, 0);
        const objetivo = esUrlYouTube(entrada) ? entrada : `ytsearch1:${entrada}`;
        const salida = await ejecutarDescarga([
            '--merge-output-format', 'mp4',
            '-f', 'bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=480]+bestaudio/best[ext=mp4]/best',
            '--max-filesize', '15M',
            '--no-simulate',
            '--print', 'after_move:%(title)s',
            '-o', path.join(dir, 'video.%(ext)s'),
            objetivo
        ], timeoutMs, opts);

        const archivo = fs.readdirSync(dir).find(f => !f.endsWith('.part'));
        if (!archivo) throw new Error('No se generó el archivo de video');
        const ruta = path.join(dir, archivo);
        const size = fs.statSync(ruta).size;
        if (!size) throw new Error('El video descargado está vacío');

        return {
            ruta,
            dir,
            size,
            titulo: extraerTitulo(salida, esUrlYouTube(entrada) ? 'Video de YouTube' : entrada)
        };
    } catch (e) {
        try { fs.rmSync(dir, { recursive: true, force: true }); } catch (x) {}
        throw e;
    }
}

async function descargarVideo(entrada, timeoutMs = 240000, opts = {}) {
    const data = await descargarVideoArchivo(entrada, timeoutMs, opts);
    try {
        const buffer = fs.readFileSync(data.ruta);
        return {
            buffer,
            titulo: data.titulo,
            tamanoMB: (data.size / 1024 / 1024).toFixed(2)
        };
    } finally {
        try { fs.rmSync(data.dir, { recursive: true, force: true }); } catch (e) {}
    }
}

module.exports = {
    getYtdlp,
    ejecutarYtdlp,
    esUrlYouTube,
    descargarAudio,
    descargarVideo,
    descargarVideoArchivo
};
