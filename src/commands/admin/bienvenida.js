const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'bienvenida',
    alias: ['bienvenido', 'welcome'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        const data = cargar();
        if (!data[chatId]) data[chatId] = {};

        if (args.length === 0) {
            const actual = data[chatId].bienvenida || '_No configurada_ (por defecto: mensaje genérico)';
            return await sock.sendMessage(chatId, {
                text: `👋 *Mensaje de bienvenida actual:*\n\n${actual}\n\n` +
                      `_Para cambiarlo:_\n,bienvenida ¡Hola {user}! Bienvenido a {grupo}\n\n` +
                      `_Para desactivarlo:_\n,bienvenida off`
            });
        }

        const texto = args.join(' ');
        if (texto.toLowerCase() === 'off') {
            delete data[chatId].bienvenida;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '🔕 Bienvenida desactivada.' });
        }

        data[chatId].bienvenida = texto;
        guardar(data);
        await sock.sendMessage(chatId, { text: `✅ Bienvenida configurada:\n\n${texto}` });
    }
};
