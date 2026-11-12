const fs = require('fs');
const path = require('path');

const HOME = process.env.HOME || '/app';
const BACKUP_DIR = path.join(HOME, 'backup_local');

const ARCHIVOS = [
    'economia.json',
    'premium.json',
    'config_grupos.json',
    'activos.json',
    'reportes.json',
    'muted_users.json',
    'packname.json',
    'warns.json',
    'reglas_grupos.json',
    'menu_config.json',
    'subbots.json',
    'recordatorios.json',
    'descargas_pendientes.json',
    'descargas_fallidas.json',
    'descargas_programadas.json'
];

let conectado = false;
const _ultimoEnvio = new Map();

function asegurarDir() {
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function firma(ruta) {
    try {
        const st = fs.statSync(ruta);
        return `${st.mtimeMs}_${st.size}`;
    } catch { return ''; }
}

async function conectar() {
    asegurarDir();
    conectado = true;
    console.log(`💾 Modo local activo (sin MongoDB). Backups en: ${BACKUP_DIR}`);
    return true;
}

async function bajarDatos(forzar = false) {
    if (!conectado) return;
    try {
        if (!fs.existsSync(BACKUP_DIR)) return;
        let n = 0;
        for (const archivo of ARCHIVOS) {
            const respaldo = path.join(BACKUP_DIR, archivo);
            if (!fs.existsSync(respaldo)) continue;
            const destino = path.join(HOME, archivo);
            const existe = fs.existsSync(destino) && fs.statSync(destino).size > 0;
            if (existe && !forzar) continue;
            fs.copyFileSync(respaldo, destino);
            _ultimoEnvio.set(archivo, firma(destino));
            n++;
        }
        if (n > 0) console.log(`📥 Datos restaurados desde backup local (${n} archivos)`);
    } catch (e) {
        console.error('❌ Error restaurando backup local:', e.message);
    }
}

async function subirDatos() {
    if (!conectado) return;
    try {
        asegurarDir();
        let n = 0;
        for (const archivo of ARCHIVOS) {
            const origen = path.join(HOME, archivo);
            if (!fs.existsSync(origen)) continue;
            const f = firma(origen);
            if (_ultimoEnvio.get(archivo) === f) continue;
            fs.copyFileSync(origen, path.join(BACKUP_DIR, archivo));
            _ultimoEnvio.set(archivo, f);
            n++;
        }
        if (n > 0) console.log(`📤 Backup local actualizado (${n} archivos)`);
    } catch (e) {
        console.error('❌ Error guardando backup local:', e.message);
    }
}

let pendiente = false;
function subirEnSegundoPlano() {
    if (pendiente) return;
    pendiente = true;
    setTimeout(async () => {
        try { await subirDatos(); } catch (e) {}
        pendiente = false;
    }, 3000);
}

setInterval(async () => { if (conectado) await subirDatos(); }, 2 * 60 * 1000);

module.exports = { conectar, bajarDatos, subirDatos, subirEnSegundoPlano, BACKUP_DIR };
