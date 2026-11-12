const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');

const HOME = process.env.HOME || '/data/data/com.termux/files/home';
const PREFIJOS_TEMP = [
    'dl_', 'tiktok_', 'ig_', 'fb_', 'x_', 'vid_', 'song_', 'audio_', 'video_',
    'gif_', 'in_', 'out_', 'attp_', 'ttp_', 'brat_', 'rec_', 'ss_'
];
const PREFIJOS_GALERIA = ['dl_', 'tiktok_', 'ig_', 'fb_', 'x_', 'video_', 'audio_', 'rec_'];

function formatearBytes(bytes) {
    const n = Math.max(0, Number(bytes) || 0);
    if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(1)} GB`;
    if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(1)} MB`;
    if (n >= 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${Math.floor(n)} B`;
}

function espacio() {
    try {
        const st = fs.statfsSync(HOME);
        const total = Number(st.blocks) * Number(st.bsize);
        const libre = Number(st.bavail) * Number(st.frsize || st.bsize);
        return { total, libre, usado: Math.max(0, total - libre) };
    } catch {
        return { total: 0, libre: 0, usado: 0 };
    }
}

function verificarEspacio(bytes, margen = 300 * 1024 * 1024) {
    const { libre, total } = espacio();
    if (!total) return true;
    if (libre < Number(bytes) + margen) {
        const error = new Error(`Espacio insuficiente: quedan ${formatearBytes(libre)} y se necesitan ${formatearBytes(Number(bytes) + margen)}.`);
        error.code = 'ESPACIO';
        throw error;
    }
    return true;
}

function esViejo(ruta, maxAgeMs) {
    try { return Date.now() - fs.statSync(ruta).mtimeMs > maxAgeMs; }
    catch { return false; }
}

function borrar(ruta) {
    try { fs.rmSync(ruta, { recursive: true, force: true }); return true; }
    catch { return false; }
}

function limpiarTemporales({ maxAgeMs = 6 * 60 * 60 * 1000, galeria = false, maxAgeGaleriaMs = 7 * 24 * 60 * 60 * 1000 } = {}) {
    const borrados = [];
    const tmp = os.tmpdir();
    try {
        for (const nombre of fs.readdirSync(tmp)) {
            if (!PREFIJOS_TEMP.some(p => nombre.startsWith(p))) continue;
            const ruta = path.join(tmp, nombre);
            if (esViejo(ruta, maxAgeMs) && borrar(ruta)) borrados.push(ruta);
        }
    } catch {}
    if (galeria) {
        const movies = path.join(HOME, 'storage', 'movies');
        try {
            for (const nombre of fs.readdirSync(movies)) {
                if (!PREFIJOS_GALERIA.some(p => nombre.startsWith(p))) continue;
                const ruta = path.join(movies, nombre);
                if (esViejo(ruta, maxAgeGaleriaMs) && borrar(ruta)) borrados.push(ruta);
            }
        } catch {}
    }
    return borrados;
}

function escanearGaleria(ruta) {
    return new Promise(resolve => {
        execFile('termux-media-scan', ['-v', ruta], { timeout: 15000 }, () => resolve());
    });
}

function moverArchivo(origen, destino) {
    try { fs.renameSync(origen, destino); }
    catch {
        fs.copyFileSync(origen, destino);
        try { fs.unlinkSync(origen); } catch {}
    }
}

async function guardarEnGaleria(buffer, nombre, carpeta = 'movies') {
    const base = path.basename(String(nombre || `archivo_${Date.now()}`));
    const dir = path.join(HOME, 'storage', carpeta);
    fs.mkdirSync(dir, { recursive: true });
    const destino = path.join(dir, base);
    fs.writeFileSync(destino, buffer);
    await escanearGaleria(destino);
    return destino;
}

async function guardarArchivoEnGaleria(origen, nombre, carpeta = 'movies') {
    const base = path.basename(String(nombre || path.basename(origen)));
    const dir = path.join(HOME, 'storage', carpeta);
    fs.mkdirSync(dir, { recursive: true });
    const destino = path.join(dir, base);
    moverArchivo(origen, destino);
    await escanearGaleria(destino);
    return destino;
}

function borrarArchivo(ruta) {
    if (!ruta) return false;
    try { fs.unlinkSync(ruta); return true; } catch { return false; }
}

module.exports = {
    HOME,
    formatearBytes,
    espacio,
    verificarEspacio,
    limpiarTemporales,
    guardarEnGaleria,
    guardarArchivoEnGaleria,
    moverArchivo,
    borrarArchivo,
    borrar
};
