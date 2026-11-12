const CONFESIONES = [
    'Confieso que alguien del grupo me parece muy atractivo/a.',
    'Confieso que tengo un crush secreto en este grupo.',
    'Confieso que me gustaría besar a alguien de aquí.',
    'Confieso que he tenido sueños con alguien que conozco.',
    'Confieso que me derrito cuando me hablan al oído.',
    'Confieso que he mandado fotos que no debería.',
    'Confieso que me gusta coquetear aunque no quiera nada serio.',
    'Confieso que mi mayor fantasía es una cita sorpresa.',
    'Confieso que he pensado en alguien del grupo más de lo normal.',
    'Confieso que me encanta que me miren con intensidad.',
    'Confieso que me gustaría recibir un mensaje atrevido ahora mismo.',
    'Confieso que le tengo ganas a alguien que no debería.',
    'Confieso que he coqueteado con alguien solo por diversión.',
    'Confieso que me gusta cuando alguien toma la iniciativa.',
    'Confieso que me muero por una noche sin reglas.'
];

module.exports = {
    name: 'confesion',
    alias: ['confiesa', 'confesiones'],
    async execute(sock, msg, args, { chatId }) {
        const confesion = CONFESIONES[Math.floor(Math.random() * CONFESIONES.length)];
        await sock.sendMessage(chatId, {
            text: `🤫 *CONFESIÓN ANÓNIMA*\n\n_"${confesion}"_`
        });
    }
};
