const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const HOME = process.env.HOME || '/app';
const AUTH_DIR = path.join(HOME, 'auth_info');
const BACKUP_DIR = path.join(HOME, 'backup_local');
const BACKUP_FILE = path.join(BACKUP_DIR, 'auth_info.json.gz');

let conectado = false;
let _fingerprint = '';

function asegurarDir() {
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function fingerprintDir(dir) {
    try {
        const files = fs.readdirSync(dir).sort();
        let h = 0;
        for (const f of files) {
            try {
                const st = fs.statSync(path.join(dir, f));
                h = (h * 31 + st.mtimeMs + st.size) % 1e15;
            } catch {}
        }
        return `${files.length}_${h}`;
    } catch { return ''; }
}

async function conectar() {
    asegurarDir();
    conectado = true;
    console.log(`💾 authPersist local activo (sin MongoDB). Backup: ${BACKUP_FILE}`);
    return true;
}

async function subirAuth(forzar = false) {
    if (!conectado) return;
    if (!fs.existsSync(AUTH_DIR)) return;
    try {
        const fp = fingerprintDir(AUTH_DIR);
        if (!forzar && fp === _fingerprint) return;

        const archivos = {};
        for (const file of fs.readdirSync(AUTH_DIR)) {
            const ruta = path.join(AUTH_DIR, file);
            try {
                if (fs.statSync(ruta).isFile()) {
                    archivos[file] = fs.readFileSync(ruta).toString('base64');
                }
            } catch {}
        }

        const comprimido = zlib.gzipSync(JSON.stringify(archivos));
        asegurarDir();
        const tmp = `${BACKUP_FILE}.tmp`;
        fs.writeFileSync(tmp, comprimido);
        fs.renameSync(tmp, BACKUP_FILE);
        _fingerprint = fp;
        console.log(`📤 auth_info guardado localmente (${(comprimido.length / 1024).toFixed(2)} KB, ${Object.keys(archivos).length} archivos)`);
    } catch (e) {
        console.error('❌ Error guardando auth_info:', e.message);
    }
}

async function bajarAuth(forzar = false) {
    if (!conectado) return false;
    try {
        if (!fs.existsSync(BACKUP_FILE)) {
            console.log('⚠️ authPersist: no hay sesión guardada localmente');
            return false;
        }

        const tieneSesion = fs.existsSync(AUTH_DIR) && fs.readdirSync(AUTH_DIR).length > 0;
        if (tieneSesion && !forzar) return false;

        const archivos = JSON.parse(zlib.gunzipSync(fs.readFileSync(BACKUP_FILE)).toString('utf8'));
        if (!fs.existsSync(AUTH_DIR)) fs.mkdirSync(AUTH_DIR, { recursive: true });
        for (const [nombre, contenidoBase64] of Object.entries(archivos)) {
            fs.writeFileSync(path.join(AUTH_DIR, nombre), Buffer.from(contenidoBase64, 'base64'));
        }
        _fingerprint = fingerprintDir(AUTH_DIR);
        console.log(`📥 auth_info restaurado desde backup local (${Object.keys(archivos).length} archivos)`);
        return true;
    } catch (e) {
        console.error('❌ Error restaurando auth_info:', e.message);
        return false;
    }
}

setInterval(async () => { if (conectado) await subirAuth(); }, 5 * 60 * 1000);

module.exports = { conectar, subirAuth, bajarAuth };
