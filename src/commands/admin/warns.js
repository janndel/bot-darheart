const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'warns.json');

function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }

module.exports = {
    name: 'warns',
    alias: ['advertencias', 'verwarns'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.\nEjemplo: ,warns @usuario' });
        }

        const targetJid = limpiarJid(mencion[0]);
        const num = targetJid.split('@')[0];

        const data = cargar();
        const count = data[chatId]?.[num] || 0;

        await sock.sendMessage(chatId, {
            text: `📊 @${num} tiene *${count}/3* advertencias.`,
            mentions: [targetJid]
        });
    }
};
