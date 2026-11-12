function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }

module.exports = {
    name: 'pareja',
    alias: ['emparejar', 'couple', 'match'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        try {
            const metadata = await sock.groupMetadata(chatId);
            const participantes = metadata.participants.map(p => limpiarJid(p.id));

            if (participantes.length < 2) {
                return await sock.sendMessage(chatId, { text: '⚠️ Se necesitan al menos 2 miembros.' });
            }

            const mezclados = [...participantes].sort(() => Math.random() - 0.5);
            const p1 = mezclados[0];
            const p2 = mezclados[1];
            const num1 = p1.split('@')[0];
            const num2 = p2.split('@')[0];

            const frases = [
                '💋 ¡Se ven peligrosos juntos!',
                '🔥 ¡Esto promete una noche interesante!',
                '💘 ¡Amor a primera vista!',
                '💖 ¡Pareja del año!',
                '❤️ ¡Se complementan perfecto!',
                '🥵 ¡Hay química, se nota!',
                '💞 ¡Merecen una cita ya!',
                '😏 ¡Los veo muy cómplices!'
            ];
            const frase = frases[Math.floor(Math.random() * frases.length)];

            await sock.sendMessage(chatId, {
                text: `💘 *PAREJA ALEATORIA*\n\n` +
                      `👤 @${num1}\n` +
                      `❤️ +\n` +
                      `👤 @${num2}\n\n` +
                      `${frase}\n\n` +
                      `_¿Qué opinan del match?_`,
                mentions: [p1, p2]
            });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
