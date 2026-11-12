const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'pingall',
    alias: ['checkall', 'testall'],
    category: 'owner',
    desc: 'Verificar el estado de todos los servicios',
    async execute(sock, msg, args, { chatId }) {
        const HOME = process.env.HOME;
        const checks = [];

        // Backup local
        try {
            const db = require('../../../db');
            checks.push('✅ Backup local (db)');
        } catch { checks.push('❌ Backup local (db)'); }

        // Auth persist
        try {
            const authPersist = require('../../../authPersist');
            checks.push('✅ authPersist local');
        } catch { checks.push('❌ authPersist local'); }

        // Cookies
        const cookiesDest = path.join(HOME, 'storage', 'downloads');
        if (fs.existsSync(cookiesDest)) {
            const n = fs.readdirSync(cookiesDest).filter(f => f.endsWith('.txt')).length;
            checks.push(`✅ Cookies (${n})`);
        } else checks.push('❌ Cookies');

        // JSONs
        const jsons = ['premium.json', 'config_grupos.json', 'economia.json', 'menu_config.json'];
        let jsonsOk = 0;
        for (const j of jsons) if (fs.existsSync(path.join(HOME, j))) jsonsOk++;
        checks.push(`✅ JSONs (${jsonsOk}/${jsons.length})`);

        // Memoria
        const mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        checks.push(`💾 RAM: ${mem} MB`);

        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const m = Math.floor((uptime % 3600) / 60);
        checks.push(`⏱️ Uptime: ${h}h ${m}m`);

        await sock.sendMessage(chatId, {
            text: `🔍 *PING ALL*\n\n${checks.join('\n')}`
        });
    }
};
