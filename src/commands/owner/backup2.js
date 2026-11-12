const fs = require('fs');
const path = require('path');

const OWNERS = ['75501934751805', '584164659101', '584162662671'];
function esOwner(jid) {
    if (!jid) return false;
    return OWNERS.includes(jid.split('@')[0].split(':')[0]);
}

module.exports = {
    name: 'backup2',
    alias: ['respaldar2', 'backupfull'],
    category: 'owner',
    desc: 'Guardar todos los datos en backup local ahora',
    async execute(sock, msg, args, { chatId }) {
        const sender = msg.key.participant || msg.key.remoteJid || chatId;
        if (!esOwner(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Solo el owner.' });
        }

        try {
            const db = require('../../../db');
            const authPersist = require('../../../authPersist');
            await db.subirDatos();
            await authPersist.subirAuth(true);
            await sock.sendMessage(chatId, {
                text: `✅ *Backup completo*\n\n📤 Datos + auth_info guardados en backup_local.`
            });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
