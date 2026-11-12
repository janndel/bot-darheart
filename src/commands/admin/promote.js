module.exports = {
    name: 'promote',
    alias: ['promover', 'ascender'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mentioned || mentioned.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona al usuario que quieres promover.' });
        }

        const sender = msg.key.participant;
        const userToPromote = mentioned[0];

        try {
            const metadata = await sock.groupMetadata(chatId);
            const soloNumero = (jid) => jid.split('@')[0].split(':')[0];

            // IDs del bot (por teléfono y por LID)
            const botNum = soloNumero(sock.user.id);
            const botLid = sock.user.lid ? soloNumero(sock.user.lid) : null;

            console.log('🔍 Bot ID:', sock.user.id);
            console.log('🔍 Bot LID:', sock.user.lid);
            console.log('🔍 Sender:', sender);

            // ✅ Buscar participante por cualquiera de sus IDs (id o lid)
            const buscarParticipante = (numeros) => {
                return metadata.participants.find(p => {
                    const pNum = soloNumero(p.id);
                    const pLid = p.lid ? soloNumero(p.lid) : null;
                    return numeros.includes(pNum) || (pLid && numeros.includes(pLid));
                });
            };

            const idsBot = [botNum, botLid].filter(Boolean);
            const idsSender = [soloNumero(sender)];

            const botEnGrupo = buscarParticipante(idsBot);
            const senderEnGrupo = buscarParticipante(idsSender);

            console.log('🔍 Bot en grupo:', botEnGrupo?.id, '| admin:', botEnGrupo?.admin);
            console.log('🔍 Sender en grupo:', senderEnGrupo?.id, '| admin:', senderEnGrupo?.admin);

            // Si el sender es admin, el bot (que es el mismo usuario) también lo es
            const soyAdmin = senderEnGrupo?.admin || botEnGrupo?.admin;

            if (!botEnGrupo && !senderEnGrupo) {
                return await sock.sendMessage(chatId, { 
                    text: '❌ No te encuentro en el grupo. Asegúrate de que el bot esté en este grupo.' 
                });
            }

            if (!soyAdmin) {
                return await sock.sendMessage(chatId, { 
                    text: '❌ No te reconozco como administrador en este grupo.' 
                });
            }

            await sock.groupParticipantsUpdate(chatId, [userToPromote], 'promote');
            await sock.sendMessage(chatId, { 
                text: `✅ @${userToPromote.split('@')[0]} ahora es administrador.`,
                mentions: [userToPromote]
            });
            console.log('✅ Promote exitoso');
        } catch (error) {
            console.error('Error en promote:', error);
            await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` });
        }
    }
};
