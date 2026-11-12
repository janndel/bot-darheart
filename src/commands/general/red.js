const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }

module.exports = {
    name: 'red',
    alias: ['redes', 'social'],
    async execute(sock, msg, args, { chatId }) {
        const data = cargar();
        const red = data[chatId]?.red;
        if (!red) return await sock.sendMessage(chatId, { text: '⚠️ No hay red social configurada. Usa ,setred <link>' });
        await sock.sendMessage(chatId, { text: `🌐 *Nuestra red social:*\n\n${red}` });
    }
};
