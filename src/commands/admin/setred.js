const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

module.exports = {
    name: 'setred',
    alias: ['setredes', 'configred'],
    async execute(sock, msg, args, { chatId }) {
        if (args.length === 0) {
            const data = cargar();
            const actual = data[chatId]?.red || '_No configurada_';
            return await sock.sendMessage(chatId, { text: `🌐 *Red social actual:* ${actual}\n\n_,setred <link>` });
        }
        const data = cargar();
        if (!data[chatId]) data[chatId] = {};
        data[chatId].red = args.join(' ');
        guardar(data);
        await sock.sendMessage(chatId, { text: `✅ Red social guardada.` });
    }
};
