const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'antilink',
    alias: ['antienlace', 'antilinks', 'antienlaces'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        const data = cargar();
        if (!data[chatId]) data[chatId] = {};

        const opcion = (args[0] || '').toLowerCase();

        if (opcion === 'on' || opcion === 'activar') {
            data[chatId].antilink = true;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔒 Antilink *activado*. Borraré enlaces automáticamente.' });
        }

        if (opcion === 'off' || opcion === 'desactivar') {
            data[chatId].antilink = false;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔓 Antilink *desactivado*.' });
        }

        const estado = data[chatId].antilink ? '🟢 Activado' : '🔴 Desactivado';
        await sock.sendMessage(chatId, {
            text: `🛡️ *Antilink:* ${estado}\n\n` +
                  `_Para cambiar:_\n,antilink on\n,antilink off`
        });
    }
};
