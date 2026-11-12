const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'antiflood',
    alias: ['antispam'],
    category: 'admin',
    desc: 'Evita spam de mensajes (on/off)',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        const data = cargar();
        if (!data[chatId]) data[chatId] = {};
        const op = (args[0] || '').toLowerCase();

        if (op === 'on') {
            data[chatId].antiflood = true;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🛡️ *Antiflood activado.*' });
        }
        if (op === 'off') {
            data[chatId].antiflood = false;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔓 *Antiflood desactivado.*' });
        }
        const estado = data[chatId].antiflood ? '🟢 Activado' : '🔴 Desactivado';
        await sock.sendMessage(chatId, { text: `🛡️ *Antiflood:* ${estado}\n\n_,antiflood on\n,antiflood off` });
    }
};
