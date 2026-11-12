const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'addfiltro',
    alias: ['addpalabra', 'filtro'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        const data = cargar();
        if (!data[chatId]) data[chatId] = {};
        if (!data[chatId].banned) data[chatId].banned = [];

        if (args.length === 0) {
            const lista = data[chatId].banned;
            return await sock.sendMessage(chatId, {
                text: `🚫 *Palabras prohibidas (${lista.length}):*\n\n${lista.map(w => `• ${w}`).join('\n') || '_ninguna_'}\n\n_,addfiltro <palabra>\n,quitarfiltro <palabra>`
            });
        }

        const palabra = args.join(' ').toLowerCase();
        if (!data[chatId].banned.includes(palabra)) {
            data[chatId].banned.push(palabra);
            guardar(data);
        }
        await sock.sendMessage(chatId, { text: `✅ Palabra añadida al filtro: *${palabra}*` });
    }
};
