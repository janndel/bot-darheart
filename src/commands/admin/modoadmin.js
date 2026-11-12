const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'modoadmin',
    alias: ['adminonly', 'soloadmin', 'onlyadmin'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        const data = cargar();
        if (!data[chatId]) data[chatId] = {};
        const op = (args[0] || '').toLowerCase();
        if (op === 'on') {
            data[chatId].modoadmin = true;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔒 *Modo admin activado.* Solo admins pueden usar comandos.' });
        }
        if (op === 'off') {
            data[chatId].modoadmin = false;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔓 *Modo admin desactivado.* Todos pueden usar comandos.' });
        }
        const estado = data[chatId].modoadmin ? '🟢 Activado' : '🔴 Desactivado';
        await sock.sendMessage(chatId, { text: `🛡️ *Modo admin:* ${estado}\n\n_,modoadmin on\n,modoadmin off` });
    }
};
