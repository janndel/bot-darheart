const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const PREMIUM_FILE = path.join(process.env.HOME, 'premium.json');
const OWNERS = ['75501934751805', '584164659101', '584162662671'];

function esOwner(jid) {
    if (!jid) return false;
    const num = jid.split('@')[0].split(':')[0];
    return OWNERS.includes(num);
}
function cargar() {
    try { return JSON.parse(fs.readFileSync(PREMIUM_FILE, 'utf8')); }
    catch { return { activos: {}, clavesUsadas: [] }; }
}
function guardar(d) { writeJsonAtomic(PREMIUM_FILE, d); }

module.exports = {
    name: 'quitarpremium',
    alias: ['delpremium', 'removepremium'],
    category: 'owner',
    desc: 'Quitar premium a un chat (solo owner)',
    async execute(sock, msg, args, { chatId }) {
        const sender = (msg.key.participant || msg.key.remoteJid || chatId);
        if (!esOwner(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Solo el owner.' });
        }

        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;

        // Caso 1: mencionando a alguien (quita premium del chat actual o del mencionado)
        // Caso 2: sin args → quita premium del chat actual
        // Caso 3: con chatId → quita premium de ese chat específico

        const data = cargar();
        let targetChatId = chatId;

        if (args[0] && args[0].includes('@')) {
            targetChatId = args[0];
        }

        if (!data.activos[targetChatId]) {
            return await sock.sendMessage(chatId, {
                text: `⚠️ El chat \`${targetChatId}\` no tiene premium activo.`
            });
        }

        const info = data.activos[targetChatId];
        delete data.activos[targetChatId];
        guardar(data);

        await sock.sendMessage(chatId, {
            text: `✅ *PREMIUM REMOVIDO*\n\n` +
                  `📌 Chat: \`${targetChatId}\`\n` +
                  `🔑 Clave usada: \`${info.clave}\`\n` +
                  `📅 Activado: ${new Date(info.fecha).toLocaleDateString()}\n\n` +
                  `_La clave queda marcada como usada, pero el chat ya no tiene premium._`
        });
        console.log(`❌ Premium removido de ${targetChatId}`);
    }
};
