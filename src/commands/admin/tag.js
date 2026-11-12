module.exports = {
    name: 'tag',
    alias: ['mention', 'todos', 'hidetag', 'tagall'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        try {
            const metadata = await sock.groupMetadata(chatId);
            const participantes = metadata.participants.map(p => p.id);
            const mensaje = args.join(' ') || '¡Atención a todos!';

            // ✅ Envía el mensaje con menciones ocultas (sin mostrar los @números)
            await sock.sendMessage(chatId, {
                text: `📢 *${mensaje}*`,
                mentions: participantes
            });
        } catch (error) {
            console.error('Error en tag:', error.message);
            await sock.sendMessage(chatId, { text: '❌ No se pudo mencionar a todos.' });
        }
    }
};
