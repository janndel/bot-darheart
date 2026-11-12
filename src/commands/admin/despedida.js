const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'despedida',
    alias: ['adios', 'bye', 'goodbye'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        const data = cargar();
        if (!data[chatId]) data[chatId] = {};

        if (args.length === 0) {
            const actual = data[chatId].despedida || '_No configurada_';
            return await sock.sendMessage(chatId, {
                text: `👋 *Mensaje de despedida actual:*\n\n${actual}\n\n` +
                      `_Para cambiarlo:_\n,despedida Adiós {user}\n\n` +
                      `_Para desactivarlo:_\n,despedida off`
            });
        }

        const texto = args.join(' ');
        if (texto.toLowerCase() === 'off') {
            delete data[chatId].despedida;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔕 Despedida desactivada.' });
        }

        data[chatId].despedida = texto;
        guardar(data);
        await sock.sendMessage(chatId, { text: `✅ Despedida configurada:\n\n${texto}` });
    }
};
