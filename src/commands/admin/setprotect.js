const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'setprotect',
    alias: ['proteger', 'protect'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        const data = cargar();
        if (!data[chatId]) data[chatId] = {};
        const op = (args[0] || '').toLowerCase();
        if (op === 'on') {
            data[chatId].protect = true;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔒 *Protección activada.* Solo admins pueden cambiar configuraciones del bot.' });
        }
        if (op === 'off') {
            data[chatId].protect = false;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔓 *Protección desactivada.*' });
        }
        const estado = data[chatId].protect ? '🟢 Activado' : '🔴 Desactivado';
        await sock.sendMessage(chatId, { text: `🛡️ *Protección:* ${estado}\n\n_,setprotect on\n,setprotect off` });
    }
};
