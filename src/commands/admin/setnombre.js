const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'setnombre',
    alias: ['nombrebot', 'botname'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        const data = cargar();
        if (!data[chatId]) data[chatId] = {};

        if (args.length === 0) {
            const actual = data[chatId].nombreBot || 'DARHEART';
            return await sock.sendMessage(chatId, { text: `📛 *Nombre actual:* ${actual}\n\n_,setnombre NuevoNombre` });
        }

        const nuevo = args.join(' ');
        data[chatId].nombreBot = nuevo;
        guardar(data);
        await sock.sendMessage(chatId, { text: `✅ *Nombre del bot actualizado a:* ${nuevo}` });
    }
};
