module.exports = {
    name: 'demote',
    alias: ['degradar', 'quitaradmin'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mentioned || mentioned.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona al usuario que quieres degradar.' });
        }

        const sender = msg.key.participant;
        const userToDemote = mentioned[0];

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

            if (!botEnGrupo?.admin && !senderEnGrupo?.admin) {
                return await sock.sendMessage(chatId, { text: '❌ No tienes permisos de administrador.' });
            }

            await sock.groupParticipantsUpdate(chatId, [userToDemote], 'demote');
            await sock.sendMessage(chatId, { 
                text: `✅ @${userToDemote.split('@')[0]} ya no es administrador.`,
                mentions: [userToDemote]
            });
        } catch (error) {
            console.error('Error en demote:', error.message);
            await sock.sendMessage(chatId, { text: '❌ No se pudo degradar al usuario.' });
        }
    }
};
