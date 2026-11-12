const FRASES = [
    'Hoy es un buen día para empezar algo nuevo.',
    'La paciencia es la madre de la ciencia.',
    'El que persevera alcanza.',
    'No dejes para mañana lo que puedas hacer hoy.',
    'Sonríe, la vida es más bonita así.',
    'Rodéate de personas que te sumen.',
    'El éxito es la suma de pequeños esfuerzos.',
    'Confía en el proceso.',
    'Sé amable, todos libramos batallas.',
    'Hoy es el mañana que ayer te preocupaba.'
];

module.exports = {
    name: 'frasedeldia',
    alias: ['frasedia', 'motivacion2'],
    category: 'general',
    desc: 'Frase inspiradora del día',
    async execute(sock, msg, args, { chatId }) {
        const frase = FRASES[Math.floor(Math.random() * FRASES.length)];
        await sock.sendMessage(chatId, {
            text: `💭 *FRASE DEL DÍA*\n\n_"${frase}"_`
        });
    }
};
