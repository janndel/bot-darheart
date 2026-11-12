module.exports = {
    name: 'perfil',
    alias: ['pfp', 'fotoperfil', 'profile', 'getpic'],
    async execute(sock, msg, args, { chatId }) {
        // Detectar si es mención o el propio usuario
        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        const target = mentioned && mentioned.length > 0 ? mentioned[0] : (msg.key.participant || msg.key.remoteJid);

        try {
            const url = await sock.profilePictureUrl(target, 'image');
            await sock.sendMessage(chatId, {
                image: { url },
                caption: `📸 Foto de perfil de @${target.split('@')[0]}`,
                mentions: [target]
            });
        } catch (error) {
            console.error('Error perfil:', error.message);
            await sock.sendMessage(chatId, { 
                text: `❌ @${target.split('@')[0]} no tiene foto de perfil o es privada.`,
                mentions: [target]
            });
        }
    }
};
