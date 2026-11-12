const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'antisticker',
    alias: ['antistikers'],
    category: 'admin',
    desc: 'Evita spam de stickers (on/off)',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        const data = cargar();
        if (!data[chatId]) data[chatId] = {};
        const op = (args[0] || '').toLowerCase();

        if (op === 'on') {
            data[chatId].antisticker = true;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🛡️ *Antisticker activado.*' });
        }
        if (op === 'off') {
            data[chatId].antisticker = false;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔓 *Antisticker desactivado.*' });
        }
        const estado = data[chatId].antisticker ? '🟢 Activado' : '🔴 Desactivado';
        await sock.sendMessage(chatId, { text: `🛡️ *Antisticker:* ${estado}\n\n_,antisticker on\n,antisticker off` });
    }
};
