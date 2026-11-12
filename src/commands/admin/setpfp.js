module.exports = {
    name: 'setpfp',
    alias: ['cambiarfoto', 'fotogruponuevo'],
    async execute(sock, msg, args, { chatId, downloadMediaMessage }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        // Detectar imagen: respondida o enviada directamente
        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        const propio = msg.message.imageMessage;

        if (!quoted?.imageMessage && !propio) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Responde a una imagen con ,setpfp para cambiarla como foto del grupo.' 
            });
        }

        const media = propio ? msg.message : quoted;
        const mediaKey = propio ? msg.key : { remoteJid: chatId, id: msg.message.extendedTextMessage.contextInfo.stanzaId, participant: msg.message.extendedTextMessage.contextInfo.participant };

        try {
            // ✅ Verificar que el bot sea admin
            const metadata = await sock.groupMetadata(chatId);
            const soloNumero = (jid) => jid.split('@')[0].split(':')[0];
            const botNum = soloNumero(sock.user.id);
            const botLid = sock.user.lid ? soloNumero(sock.user.lid) : null;

            const botEnGrupo = metadata.participants.find(p => {
                const pNum = soloNumero(p.id);
                const pLid = p.lid ? soloNumero(p.lid) : null;
                return pNum === botNum || (botLid && (pNum === botLid || pLid === botLid));
            });

            if (!botEnGrupo?.admin) {
                return await sock.sendMessage(chatId, { text: '❌ Necesito ser admin del grupo para cambiar la foto.' });
            }

            // ✅ Descargar la imagen usando la función del contexto
            const buffer = await downloadMediaMessage(
                { message: media, key: mediaKey },
                'buffer',
                {},
                { logger: sock.logger, reuploadRequest: sock.updateMediaMessage }
            );

            // ✅ Cambiar foto del grupo
            await sock.updateProfilePicture(chatId, buffer);
            await sock.sendMessage(chatId, { text: '✅ Foto del grupo actualizada.' });
            console.log('✅ Foto de grupo cambiada');
        } catch (error) {
            console.error('Error setpfp:', error.message);
            await sock.sendMessage(chatId, { text: `❌ No pude cambiar la foto: ${error.message}` });
        }
    }
};
