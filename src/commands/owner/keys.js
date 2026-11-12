const fs = require('fs');
const path = require('path');

const PREMIUM_FILE = path.join(process.env.HOME, 'premium.json');

// ✅ Ruta correcta al archivo key.js (están en la misma carpeta)
const KEY_FILE = path.join(__dirname, 'key.js');

const OWNERS = ['75501934751805', '584164659101', '584162662671'];

function esOwner(jid) {
    if (!jid) return false;
    const soloNumero = jid.split('@')[0].split(':')[0];
    return OWNERS.includes(soloNumero);
}

function obtenerClavesValidas() {
    try {
        if (!fs.existsSync(KEY_FILE)) {
            console.log('⚠️ keys.js: no existe', KEY_FILE);
            return [];
        }
        const contenido = fs.readFileSync(KEY_FILE, 'utf8');
        const match = contenido.match(/const CLAVES_VALIDAS = \[([\s\S]*?)\];/);
        if (!match) {
            console.log('⚠️ keys.js: no encontró CLAVES_VALIDAS');
            return [];
        }
        const claves = match[1].match(/'([^']+)'/g);
        if (claves) {
            const resultado = claves.map(c => c.replace(/'/g, ''));
            console.log(`🔑 keys.js: ${resultado.length} claves detectadas`);
            return resultado;
        }
    } catch (e) {
        console.error('❌ Error leyendo claves:', e.message);
    }
    return [];
}

function cargarPremium() {
    try { return JSON.parse(fs.readFileSync(PREMIUM_FILE, 'utf8')); }
    catch { return { activos: {}, clavesUsadas: [] }; }
}

module.exports = {
    name: 'keys',
    alias: ['claves', 'listkeys', 'premiumlist'],
    async execute(sock, msg, args, { chatId }) {
        // 🔒 Solo funciona en privado
        if (chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Este comando solo funciona en privado.'
            });
        }

        // 👑 Verificar que sea el owner
        const sender = msg.key.participant || msg.key.remoteJid || chatId;
        const esRemitenteOwner = esOwner(sender) || msg.key.fromMe;

        if (!esRemitenteOwner) {
            return await sock.sendMessage(chatId, {
                text: '🚫 *ACCESO DENEGADO*\n\n_No tienes permisos para ver el panel._'
            });
        }

        const todas = obtenerClavesValidas();
        const data = cargarPremium();
        const usadas = data.clavesUsadas || [];
        const disponibles = todas.filter(k => !usadas.includes(k));

        const activos = Object.entries(data.activos || {});
        const listaActivos = activos.length > 0
            ? activos.map(([id, info]) => {
                const nombre = id.endsWith('@g.us') 
                    ? `Grupo: ${id.split('@')[0].slice(-6)}...` 
                    : `Chat: ${id.split('@')[0]}`;
                return `  ➺ ${nombre} (${info.clave})`;
            }).join('\n')
            : '  _Ninguno_';

        const texto = 
            `🔑 *PANEL DE CLAVES PREMIUM*\n` +
            `👑 _Solo visible para el owner_\n\n` +
            `📊 *Estadísticas:*\n` +
            `├─ Total configuradas: *${todas.length}*\n` +
            `├─ Usadas: *${usadas.length}*\n` +
            `└─ Disponibles: *${disponibles.length}*\n\n` +
            `✅ *Claves disponibles (${disponibles.length}):*\n` +
            (disponibles.length > 0 
                ? disponibles.map(k => `  ➺ \`${k}\``).join('\n')
                : '  _No quedan claves disponibles_') +
            `\n\n` +
            `💎 *Premium activos (${activos.length}):*\n` +
            listaActivos;

        await sock.sendMessage(chatId, { text: texto });
    }
};
