const fs = require('fs');
const path = require('path');

const OWNERS = ['75501934751805', '584164659101', '584162662671'];
const HOME = process.env.HOME || '/data/data/com.termux/files/home';
const BACKUP_DIR = path.join(HOME, 'backup_local');
const MAX_BACKUPS = 10;

function asegurarDir() {
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function rotar() {
    try {
        const archivos = fs.readdirSync(BACKUP_DIR)
            .filter(f => f.endsWith('.json'))
            .map(f => {
                const ruta = path.join(BACKUP_DIR, f);
                return { nombre: f, mtime: fs.statSync(ruta).mtimeMs };
            })
            .sort((a, b) => b.mtime - a.mtime);
        while (archivos.length > MAX_BACKUPS) {
            try { fs.unlinkSync(path.join(BACKUP_DIR, archivos.pop().nombre)); } catch {}
        }
    } catch {}
}

const ARCHIVOS = [
    'config.json', 'premium.json', 'config_grupos.json',
    'activos.json', 'muted_users.json', 'packname.json',
    'menu_config.json', 'subbots.json', 'recordatorios.json',
    'descargas_pendientes.json', 'descargas_fallidas.json',
    'descargas_programadas.json'
];

module.exports = {
    name: 'backup',
    alias: ['respaldar', 'backupjson'],
    category: 'owner',
    desc: 'Crea un backup local de los datos del bot',
    oculto: true,
    ownerOnly: true,
    timeout: 30000,
    async execute(sock, msg, args, { chatId }) {
        if (chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en privado.' });
        }
        const sender = (msg.key.participant || msg.key.remoteJid || chatId).split('@')[0].split(':')[0];
        if (!OWNERS.includes(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Acceso denegado.' });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const sub = (args[0] || '').toLowerCase();
        if (sub === 'restaurar') {
            const archivos = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith('.json')).sort();
            if (!archivos.length) {
                return await sock.sendMessage(chatId, { text: '📭 No hay backups locales.' });
            }
            const linea = archivos.map((f, i) => `${i + 1}. ${f}`).slice(0, 15).join('\n');
            return await sock.sendMessage(chatId, { text: `📁 *BACKUPS LOCALES*\n\n${linea}\n\nUsa: ,backup restaurar <número>` });
        }

        let enviados = 0;
        for (const archivo of ARCHIVOS) {
            const ruta = path.join(HOME, archivo);
            if (!fs.existsSync(ruta)) continue;
            try {
                const contenido = fs.readFileSync(ruta, 'utf8');
                await sock.sendMessage(chatId, {
                    document: Buffer.from(contenido),
                    mimetype: 'application/json',
                    fileName: archivo,
                    caption: `📦 Backup: ${archivo}`
                });
                enviados++;
            } catch (e) {
                console.error(`Error enviando ${archivo}:`, e.message);
            }
        }

        await sock.sendMessage(chatId, {
            text: `✅ *Backup completado*\n\n📦 Archivos enviados: *${enviados}/${ARCHIVOS.length}*\n📅 Fecha: ${new Date().toLocaleString('es-VE')}`
        });

        // Guardar copia local
        try {
            asegurarDir();
            for (const archivo of ARCHIVOS) {
                const origen = path.join(HOME, archivo);
                if (!fs.existsSync(origen)) continue;
                const destino = path.join(BACKUP_DIR, `${timestamp}_${archivo}`);
                fs.copyFileSync(origen, destino);
            }
            rotar();
            console.log(`💾 Backup local guardado: ${timestamp}`);
        } catch (e) {
            console.error('Error guardando backup local:', e.message);
        }
    }
};