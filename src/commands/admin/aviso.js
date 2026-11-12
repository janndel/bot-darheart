module.exports = {
    name: 'aviso',
    alias: ['anuncio', 'comunicado'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        if (args.length === 0) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Escribe el mensaje del aviso.\nEjemplo: ,aviso Reunión mañana a las 8pm' 
            });
        }

        const mensaje = args.join(' ');

        try {
            const metadata = await sock.groupMetadata(chatId);
            const participantes = metadata.participants.map(p => p.id);

            const texto = 
                `📢 *AVISO IMPORTANTE*\n` +
                `━━━━━━━━━━━━━━━━━━━\n\n` +
                `${mensaje}\n\n` +
                `━━━━━━━━━━━━━━━━━━━\n` +
                `👤 _Enviado por el administrador_`;

            // ✅ Envía con menciones ocultas (sin mostrar los @números)
            await sock.sendMessage(chatId, {
                text: texto,
                mentions: participantes
            });
        } catch (error) {
            console.error('Error aviso:', error.message);
            await sock.sendMessage(chatId, { text: '❌ No se pudo enviar el aviso.' });
        }
    }
};
