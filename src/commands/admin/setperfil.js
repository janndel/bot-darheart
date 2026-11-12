module.exports = {
    name: 'setperfil',
    alias: ['setbotpfp', 'fotobot'],
    async execute(sock, msg, args, { chatId, downloadMediaMessage }) {
        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        const propio = msg.message.imageMessage;
        const media = propio ? msg.message : quoted;

        if (!media?.imageMessage) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Responde a una imagen con ,setperfil para usarla como foto del bot.'
            });
        }

        try {
            const buffer = await downloadMediaMessage(
                { message: media, key: msg.key },
                'buffer',
                {},
                { logger: sock.logger, reuploadRequest: sock.updateMediaMessage }
            );

            // ✅ Cambiar foto de perfil del bot (su propio número)
            const botJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            await sock.updateProfilePicture(botJid, buffer);
            await sock.sendMessage(chatId, { text: '✅ Foto de perfil del bot actualizada.' });
            console.log('✅ Perfil del bot actualizado');
        } catch (error) {
            console.error('Error setperfil:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
