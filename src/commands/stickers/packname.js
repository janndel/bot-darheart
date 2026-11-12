const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const PACK_FILE = path.join(process.env.HOME, 'packname.json');

function cargar() {
    try { return JSON.parse(fs.readFileSync(PACK_FILE, 'utf8')); } catch { return { nombre: 'DARHEART', autor: 'JANNDEL' }; }
}
function guardar(d) {
    writeJsonAtomic(PACK_FILE, d);
}

module.exports = {
    name: 'packname',
    alias: ['setpack', 'nombrepack'],
    async execute(sock, msg, args, { chatId }) {
        if (args.length === 0) {
            const actual = cargar();
            return await sock.sendMessage(chatId, {
                text: `📦 *Pack de stickers actual:*\n\n` +
                      `📌 Nombre: ${actual.nombre}\n` +
                      `✍️ Autor: ${actual.autor}\n\n` +
                      `_Para cambiar:_\n` +
                      `,packname <nombre> | <autor>\n` +
                      `Ejemplo: ,packname DARHEART | JANNDEL` 
            });
        }

        const texto = args.join(' ');
        const partes = texto.split('|').map(p => p.trim());
        const nombre = partes[0] || 'DARHEART';
        const autor = partes[1] || 'JANNDEL';

        guardar({ nombre, autor });

        await sock.sendMessage(chatId, {
            text: `✅ *Pack actualizado*\n\n` +
                  `📌 Nombre: ${nombre}\n` +
                  `✍️ Autor: ${autor}\n\n` +
                  `_Aplica a los próximos stickers._`
        });
    }
};
