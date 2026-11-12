const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'quitarfiltro',
    alias: ['delfiltro', 'rmpalabra'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }
        if (args.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,quitarfiltro <palabra>' });
        }
        const data = cargar();
        if (!data[chatId]?.banned || data[chatId].banned.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ No hay palabras filtradas.' });
        }
        const palabra = args.join(' ').toLowerCase();
        const antes = data[chatId].banned.length;
        data[chatId].banned = data[chatId].banned.filter(w => w !== palabra);
        const despues = data[chatId].banned.length;
        guardar(data);
        if (antes === despues) {
            return await sock.sendMessage(chatId, { text: `⚠️ La palabra *${palabra}* no estaba en el filtro.` });
        }
        await sock.sendMessage(chatId, { text: `✅ Palabra eliminada del filtro: *${palabra}*` });
    }
};
