const fs = require('fs');
const path = require('path');
const HOME = process.env.HOME;

function cargar(file, def = {}) {
    try { return JSON.parse(fs.readFileSync(path.join(HOME, file), 'utf8')); }
    catch { return def; }
}

module.exports = {
    name: 'stats',
    alias: ['estadisticas2', 'info3'],
    category: 'owner',
    desc: 'Estadísticas completas del bot',
    async execute(sock, msg, args, { chatId }) {
        const premium = cargar('premium.json', { activos: {}, clavesUsadas: [] });
        const config = cargar('config_grupos.json', {});
        const activos = cargar('activos.json', {});
        const muteados = cargar('muted_users.json', {});
        const economia = cargar('economia.json', {});

        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const m = Math.floor((uptime % 3600) / 60);

        let totalMensajes = 0;
        for (const g of Object.values(activos)) {
            for (const c of Object.values(g)) {
                totalMensajes += typeof c === 'number' ? c : (c?.count || 0);
            }
        }

        let totalCoins = 0;
        for (const g of Object.values(economia)) for (const u of Object.values(g)) totalCoins += (u.coins || 0);

        const texto =
            `📊 *ESTADÍSTICAS DEL BOT*\n` +
            `━━━━━━━━━━━━━━━━━\n\n` +
            `🤖 *Sistema:*\n` +
            `├─ Uptime: *${h}h ${m}m*\n` +
            `├─ RAM: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} MB*\n` +
            `└─ Node: *${process.version}*\n\n` +
            `💎 *Premium:*\n` +
            `├─ Activos: *${Object.keys(premium.activos || {}).length}*\n` +
            `└─ Claves usadas: *${(premium.clavesUsadas || []).length}*\n\n` +
            `👥 *Grupos:*\n` +
            `├─ Configurados: *${Object.keys(config).length}*\n` +
            `├─ Con actividad: *${Object.keys(activos).length}*\n` +
            `└─ Muteados: *${Object.keys(muteados).length}*\n\n` +
            `💬 *Total mensajes:* *${totalMensajes}*\n` +
            `💰 *Total coins:* *${totalCoins}*`;

        await sock.sendMessage(chatId, { text: texto });
    }
};
