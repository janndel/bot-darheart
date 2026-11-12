const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile, execFileSync } = require('child_process');
const { getYtdlp } = require('./ytdlp');
const downloadQueue = require('./download-queue');
const { verificarEspacio } = require('./storage');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const TIKWM_API = 'https://www.tikwm.com/api/';
const MAX_WHATSAPP_BYTES = 64 * 1024 * 1024;
const MAX_SLIDES = 20;

function ejecutar(cmd, args, timeoutMs = 600000, job = null) {
    return new Promise((resolve, reject) => {
        const child = execFile(cmd, args, { timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024 }, (err, stdout, stderr) => {
            if (err) reject(new Error((stderr || err.message).trim().slice(-300)));
            else resolve(stdout);
        });
        if (job) downloadQueue.registrarProceso(job, child);
    });
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

function cookiesTikTok() {
    const dirs = [
        path.join(os.homedir(), 'storage', 'downloads'),
        path.join(os.homedir(), 'ck')
    ];
    const out = [];
    for (const dir of dirs) {
        try {
            for (const archivo of fs.readdirSync(dir)) {
                if (archivo.toLowerCase().includes('tiktok') && archivo.endsWith('.txt')) {
                    out.push(path.join(dir, archivo));
                }
            }
        } catch (e) {}
    }
    return out;
}

async function infoTikwm(url) {
    const res = await axios.get(TIKWM_API, {
        params: { url, hd: 1 },
        timeout: 30000,
        headers: { 'User-Agent': UA }
    });
    if (res.data?.code !== 0 || !res.data?.data) {
        throw new Error(res.data?.msg || 'Tikwm no devolvió datos');
    }
    return res.data.data;
}

async function descargarUrl(url, destino, timeoutMs = 600000, job = null) {
    if (destino.endsWith('.mp4') && hayAria2()) {
        try {
            await ejecutar('aria2c', [
                '-x', '16',
                '-s', '16',
                '-k', '1M',
                '--file-allocation=none',
                '--console-log-level=error',
                '--summary-interval=0',
                '--max-tries=3',
                '--retry-wait=2',
                '--timeout=30',
                '--allow-overwrite=true',
                '--auto-file-renaming=false',
                '--header', `User-Agent: ${UA}`,
                '--referer=https://www.tiktok.com/',
                '--dir', path.dirname(destino),
                '--out', path.basename(destino),
                url
            ], timeoutMs, job);
            if (fs.existsSync(destino) && fs.statSync(destino).size > 0) {
                return fs.statSync(destino).size;
            }
        } catch (e) {
            console.log('⚠️ aria2c falló, usando descarga directa:', e.message.slice(0, 120));
        }
    }

    const res = await axios.get(url, {
        responseType: 'stream',
        timeout: timeoutMs,
        signal: job?.abortController?.signal,
        maxContentLength: 1024 * 1024 * 1024,
        maxBodyLength: 1024 * 1024 * 1024,
        headers: {
            'User-Agent': UA,
            'Referer': 'https://www.tiktok.com/'
        }
    });

    await new Promise((resolve, reject) => {
        const salida = fs.createWriteStream(destino);
        res.data.on('error', reject);
        salida.on('error', reject);
        salida.on('finish', resolve);
        res.data.pipe(salida);
    });

    const size = fs.statSync(destino).size;
    if (!size) throw new Error('Archivo vacío');
    return size;
}

async function descargarConYtDlp(url, dir, job = null) {
    const cookies = cookiesTikTok();
    const destino = path.join(dir, 'tiktok.mp4');
    let ultimoError = null;

    for (const cookie of cookies) {
        try { fs.unlinkSync(destino); } catch (e) {}
        const args = [
            '--no-update',
            '--no-warnings',
            '--no-playlist',
            '--socket-timeout', '30',
            '--retries', '3',
            '--no-check-certificates',
            '--cookies', cookie,
            '-f', 'best[ext=mp4]/best',
            '-o', destino,
            url
        ];
        try {
            await ejecutar(getYtdlp(), args, 600000, job);
            if (fs.existsSync(destino) && fs.statSync(destino).size > 0) {
                return { ruta: destino, size: fs.statSync(destino).size };
            }
        } catch (e) {
            ultimoError = e;
        }
    }

    throw ultimoError || new Error('yt-dlp no descargó el video');
}

async function descargarTikTok(url, { timeoutMs = 600000, onInfo, job = null } = {}) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tiktok_'));

    try {
        verificarEspacio(200 * 1024 * 1024, 350 * 1024 * 1024);
        const info = await infoTikwm(url);
        verificarEspacio(Number(info.hd_size || info.size) || 0, 350 * 1024 * 1024);
        const titulo = String(info.title || 'TikTok').replace(/\s+/g, ' ').trim().slice(0, 120);
        const esSlideshow = Array.isArray(info.images) && info.images.length > 0;

        if (onInfo) {
            try {
                await onInfo({
                    tipo: esSlideshow ? 'images' : 'video',
                    duration: Number(info.duration) || 0,
                    size: Number(info.hd_size || info.size) || 0,
                    fotos: esSlideshow ? info.images.length : 0
                });
            } catch (e) {}
        }

        if (esSlideshow) {
            const rutas = [];
            for (let i = 0; i < info.images.length && i < MAX_SLIDES; i++) {
                const ruta = path.join(dir, `foto_${String(i + 1).padStart(2, '0')}.jpg`);
                await descargarUrl(info.images[i], ruta, 120000, job);
                rutas.push(ruta);
            }
            if (!rutas.length) throw new Error('Sin imágenes');
            return { tipo: 'images', rutas, titulo, id: info.id, dir };
        }

        const urlsVideo = [info.hdplay, info.play, info.wmplay].filter(Boolean);
        if (!urlsVideo.length) throw new Error('Sin URL de video');

        const ruta = path.join(dir, `video_${Date.now()}.mp4`);
        let size = 0;
        let ultimoError = null;

        for (const urlVideo of [...new Set(urlsVideo)]) {
            try {
                size = await descargarUrl(urlVideo, ruta, timeoutMs, job);
                break;
            } catch (e) {
                ultimoError = e;
            }
        }

        if (!size) throw ultimoError || new Error('No se pudo bajar el video');

        return {
            tipo: 'video',
            rutas: [ruta],
            titulo,
            id: info.id,
            duration: Number(info.duration) || 0,
            size,
            dir
        };
    } catch (e) {
        if (job?.abortController?.signal?.aborted) {
            try { fs.rmSync(dir, { recursive: true, force: true }); } catch (x) {}
            throw new Error('Descarga cancelada.');
        }
        if (e?.code === 'ESPACIO') {
            try { fs.rmSync(dir, { recursive: true, force: true }); } catch (x) {}
            throw e;
        }
        try {
            const fallback = await descargarConYtDlp(url, dir, job);
            return {
                tipo: 'video',
                rutas: [fallback.ruta],
                titulo: 'TikTok',
                id: null,
                duration: 0,
                size: fallback.size,
                dir
            };
        } catch (e2) {
            try { fs.rmSync(dir, { recursive: true, force: true }); } catch (x) {}
            throw new Error(`${e.message} / ${e2.message}`);
        }
    }
}

function formatearDuracion(segundos) {
    const total = Math.max(0, Math.round(Number(segundos) || 0));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function moverArchivo(origen, destino) {
    try {
        fs.renameSync(origen, destino);
    } catch (e) {
        fs.copyFileSync(origen, destino);
        fs.unlinkSync(origen);
    }
}

function guardarEnGaleria(ruta, id) {
    const dir = path.join(os.homedir(), 'storage', 'movies');
    fs.mkdirSync(dir, { recursive: true });
    const nombre = `tiktok_${id || Date.now()}_${Date.now()}.mp4`;
    const destino = path.join(dir, nombre);
    moverArchivo(ruta, destino);
    try {
        execFile('termux-media-scan', [destino], () => {});
    } catch (e) {}
    return { destino, nombre };
}

async function enviarTikTok(sock, chatId, data, { maxBytes = MAX_WHATSAPP_BYTES } = {}) {
    let enviados = 0;

    try {
        if (data.tipo === 'images') {
            for (let i = 0; i < data.rutas.length; i++) {
                try {
                    const buffer = fs.readFileSync(data.rutas[i]);
                    await sock.sendMessage(chatId, {
                        image: buffer,
                        caption: `🖼️ *TikTok* ${i + 1}/${data.rutas.length}`
                    });
                    enviados++;
                } catch (e) {
                    console.log(`⚠️ Foto TikTok ${i + 1} falló:`, e.message);
                }
                if (i < data.rutas.length - 1) await new Promise(r => setTimeout(r, 1200));
            }
            return enviados;
        }

        const ruta = data.rutas[0];
        const size = fs.statSync(ruta).size;
        const duracion = data.duration ? `\n⏱️ ${formatearDuracion(data.duration)}` : '';
        const caption = `✅ *TikTok*\n📹 ${(size / 1024 / 1024).toFixed(2)} MB${duracion}`;

        if (size <= maxBytes) {
            try {
                const buffer = fs.readFileSync(ruta);
                await sock.sendMessage(chatId, {
                    video: buffer,
                    mimetype: 'video/mp4',
                    caption
                });
                return 1;
            } catch (e) {
                console.log('⚠️ Envío TikTok falló:', e.message);
            }
        }

        const guardado = guardarEnGaleria(ruta, data.id);
        await sock.sendMessage(chatId, {
            text: `✅ *Video de TikTok guardado en tu galería*\n📁 ${guardado.nombre}\n📹 ${(size / 1024 / 1024).toFixed(2)} MB${duracion}`
        });
        return 1;
    } finally {
        try { fs.rmSync(data.dir, { recursive: true, force: true }); } catch (e) {}
    }
}

module.exports = {
    descargarTikTok,
    enviarTikTok,
    guardarEnGaleria,
    formatearDuracion
};
