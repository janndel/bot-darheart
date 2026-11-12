const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const MUTE_FILE = path.join(process.env.HOME, 'muted_users.json');

function cargar() {
    try { return JSON.parse(fs.readFileSync(MUTE_FILE, 'utf8')); } catch { return {}; }
}
function guardar(data) {
    writeJsonAtomic(MUTE_FILE, data);
}

module.exports = {
    name: 'mutear',
    alias: ['mute'],
    category: 'admin',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mentioned || mentioned.length === 0) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Menciona al usuario que quieres mutear.\nEjemplo: ,mutear @usuario' 
            });
        }

        const data = cargar();
        if (!data[chatId]) data[chatId] = [];

        const soloNumero = (jid) => jid.split('@')[0].split(':')[0];
        const nuevos = [];

        for (const jid of mentioned) {
            const num = soloNumero(jid);
            if (!data[chatId].includes(num)) {
                data[chatId].push(num);
                nuevos.push(num);
            }
        }

        guardar(data);

        await sock.sendMessage(chatId, {
            text: `🔇 *Usuario(s) muteado(s)*\n\n` +
                  nuevos.map(n => `➺ @${n}`).join('\n') + `\n\n` +
                  `_Todos sus mensajes serán borrados automáticamente._`,
            mentions: mentioned
        });
        console.log(`🔇 Muteados en ${chatId}:`, nuevos);
    }
};
