module.exports = {
    name: 'fotogrupo',
    alias: ['gpfp', 'fotogp'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        try {
            const url = await sock.profilePictureUrl(chatId, 'image');
            const metadata = await sock.groupMetadata(chatId);
            await sock.sendMessage(chatId, {
                image: { url },
                caption: `📸 Foto del grupo: *${metadata.subject}*`
            });
        } catch (error) {
            console.error('Error fotogrupo:', error.message);
            await sock.sendMessage(chatId, { text: '❌ El grupo no tiene foto de perfil o es privada.' });
        }
    }
};
