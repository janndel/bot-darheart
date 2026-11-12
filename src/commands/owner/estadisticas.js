const fs = require('fs');
const path = require('path');

const OWNERS = ['75501934751805', '584164659101', '584162662671'];
function cargar(file, def = {}) {
    try { return JSON.parse(fs.readFileSync(path.join(process.env.HOME, file), 'utf8')); }
    catch { return def; }
}

module.exports = {
    name: 'estadisticas',
    alias: ['statsbot', 'info2'],
    async execute(sock, msg, args, { chatId }) {
        if (chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en privado.' });
        const sender = (msg.key.participant || msg.key.remoteJid || chatId).split('@')[0].split(':')[0];
        if (!OWNERS.includes(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Acceso denegado.' });
        }

        const premium = cargar('premium.json', { activos: {}, clavesUsadas: [] });
        const config = cargar('config_grupos.json', {});
        const activos = cargar('activos.json', {});
        const muteados = cargar('muted_users.json', {});
        const subbots = cargar('subbots.json', { solicitudes: [], clavesUsadas: [] });

        const numPremium = Object.keys(premium.activos || {}).length;
        const numGruposConfig = Object.keys(config).length;
        const numGruposActivos = Object.keys(activos).length;
        const numMuteados = Object.keys(muteados).length;
        const numSolicitudes = (subbots.solicitudes || []).length;

        let totalMensajes = 0;
        for (const grupo of Object.values(activos)) {
            for (const count of Object.values(grupo)) {
                totalMensajes += typeof count === 'number' ? count : (count?.count || 0);
            }
        }

        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const m = Math.floor((uptime % 3600) / 60);

        const texto = 
            `📊 *ESTADÍSTICAS DEL BOT*\n` +
            `━━━━━━━━━━━━━━━━━━━\n\n` +
            `🤖 *Bot:*\n` +
            `├─ Uptime: *${h}h ${m}m*\n` +
            `├─ RAM usada: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB*\n` +
            `└─ Node: *${process.version}*\n\n` +
            `💎 *Premium:*\n` +
            `├─ Activos: *${numPremium}*\n` +
            `└─ Claves usadas: *${(premium.clavesUsadas || []).length}*\n\n` +
            `👥 *Grupos:*\n` +
            `├─ Configurados: *${numGruposConfig}*\n` +
            `├─ Con actividad: *${numGruposActivos}*\n` +
            `└─ Muteados: *${numMuteados}*\n\n` +
            `💬 *Mensajes contados:* *${totalMensajes}*\n\n` +
            `🤖 *Sub-bots:*\n` +
            `└─ Solicitudes: *${numSolicitudes}*`;

        await sock.sendMessage(chatId, { text: texto });
    }
};
