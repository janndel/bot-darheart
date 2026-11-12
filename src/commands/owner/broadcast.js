const fs = require('fs');
const path = require('path');

const OWNERS = ['75501934751805', '584164659101', '584162662671'];

module.exports = {
    name: 'broadcast',
    alias: ['bc', 'difundir', 'anuncio2'],
    async execute(sock, msg, args, { chatId }) {
        const sender = (msg.key.participant || msg.key.remoteJid || chatId).split('@')[0].split(':')[0];
        if (!OWNERS.includes(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Acceso denegado.' });
        }

        if (args.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,broadcast <mensaje>' });
        }

        const mensaje = args.join(' ');
        await sock.sendMessage(chatId, { text: '⏳ Enviando broadcast a todos los grupos...' });

        try {
            const grupos = await sock.groupFetchAllParticipating();
            const ids = Object.keys(grupos);
            let enviados = 0, fallidos = 0;

            for (const grupoId of ids) {
                try {
                    await sock.sendMessage(grupoId, {
                        text: `📢 *COMUNICADO OFICIAL*\n\n${mensaje}\n\n_DARHEART Bot_`
                    });
                    enviados++;
                    await new Promise(r => setTimeout(r, 1500)); // Evitar spam
                } catch (e) {
                    fallidos++;
                }
            }

            await sock.sendMessage(chatId, {
                text: `✅ *Broadcast completado*\n\n📤 Enviados: *${enviados}*\n❌ Fallidos: *${fallidos}*`
            });
        } catch (error) {
            console.error('Error broadcast:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
