const respuestas = [
    '✅ Sí, definitivamente.',
    '✅ Es cierto.',
    '✅ Sin duda.',
    '✅ Sí, confía en ello.',
    '✅ Puedes contar con ello.',
    '✅ Muy probablemente.',
    '✅ Las perspectivas son buenas.',
    '✅ Sí.',
    '✅ Los signos apuntan a que sí.',
    '🤔 Respuesta confusa, intenta de nuevo.',
    '🤔 Pregunta de nuevo más tarde.',
    '🤔 Mejor no decirte ahora.',
    '🤔 No puedo predecirlo ahora.',
    '🤔 Concéntrate y pregunta de nuevo.',
    '❌ No cuentes con ello.',
    '❌ Mi respuesta es no.',
    '❌ Mis fuentes dicen que no.',
    '❌ Las perspectivas no son buenas.',
    '❌ Muy dudoso.',
    '❌ Definitivamente no.'
];

module.exports = {
    name: '8ball',
    alias: ['bola', 'bola8', 'pregunta'],
    async execute(sock, msg, args, { chatId }) {
        if (args.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Haz una pregunta.\nEjemplo: ,8ball ¿Aprobaré el examen?' });
        }

        const pregunta = args.join(' ');
        const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];

        await sock.sendMessage(chatId, {
            text: `🎱 *Bola Mágica*\n\n` +
                  `❓ *Pregunta:* ${pregunta}\n\n` +
                  `💭 *Respuesta:* ${respuesta}`
        });
    }
};
