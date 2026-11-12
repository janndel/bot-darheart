const { esOwner } = require('../../lib/permissions');

module.exports = {
    name: 'ban',
    alias: ['expulsar', 'kick', 'bang'],
    category: 'admin',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mentioned || mentioned.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona al usuario que quieres expulsar.' });
        }

        const sender = msg.key.participant;
        const userToBan = mentioned[0];

        try {
            const metadata = await sock.groupMetadata(chatId);
            const soloNumero = (jid) => jid.split('@')[0].split(':')[0];
            const botNum = soloNumero(sock.user.id);
            const botLid = sock.user.lid ? soloNumero(sock.user.lid) : null;

            const buscar = (numeros) => metadata.participants.find(p => {
                const pNum = soloNumero(p.id);
                const pLid = p.lid ? soloNumero(p.lid) : null;
                return numeros.includes(pNum) || (pLid && numeros.includes(pLid));
            });

            const botEnGrupo = buscar([botNum, botLid].filter(Boolean));
            const senderEnGrupo = buscar([soloNumero(sender)]);

            if (!senderEnGrupo?.admin && !esOwner(sock, msg)) {
                return await sock.sendMessage(chatId, { text: '❌ No tienes permisos de administrador.' });
            }

            if (!botEnGrupo?.admin) {
                return await sock.sendMessage(chatId, { text: '❌ Necesito ser administrador del grupo para expulsar.' });
            }

            await sock.groupParticipantsUpdate(chatId, [userToBan], 'remove');
            await sock.sendMessage(chatId, { 
                text: `✅ @${userToBan.split('@')[0]} ha sido expulsado del grupo.`,
                mentions: [userToBan]
            });
        } catch (error) {
            console.error('Error en ban:', error.message);
            await sock.sendMessage(chatId, { text: '❌ No se pudo expulsar al usuario.' });
        }
    }
};
