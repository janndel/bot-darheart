const fs = require('fs');
const path = require('path');

const OWNERS = ['75501934751805', '584164659101', '584162662671'];
function esOwner(jid) {
    if (!jid) return false;
    return OWNERS.includes(jid.split('@')[0].split(':')[0]);
}

module.exports = {
    name: 'restore',
    alias: [],
    category: 'owner',
    desc: 'Restaurar datos desde backup local',
    async execute(sock, msg, args, { chatId }) {
        const sender = msg.key.participant || msg.key.remoteJid || chatId;
        if (!esOwner(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Solo el owner.' });
        }

        try {
            const db = require('../../../db');
            await db.bajarDatos(true);
            await sock.sendMessage(chatId, {
                text: `✅ *Restauración completada*\n\n📥 Datos restaurados desde backup local.`
            });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
