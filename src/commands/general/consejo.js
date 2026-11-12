const consejos = [
    'La paciencia es la madre de la ciencia.',
    'Nunca te rindas, los grandes logros toman tiempo.',
    'Aprende algo nuevo cada día.',
    'El respeto se gana, no se exige.',
    'Hoy es un buen día para empezar algo nuevo.',
    'Rodéate de personas que te sumen, no que te resten.',
    'Si algo no te hace feliz, déjalo ir.',
    'La constancia vence al talento.',
    'Un error es solo una oportunidad para aprender.',
    'Sonríe, la vida es más bonita así.',
    'Valora lo que tienes antes de buscar lo que quieres.',
    'No compares tu camino con el de los demás.',
    'El éxito es la suma de pequeños esfuerzos diarios.',
    'Escucha más de lo que hablas.',
    'La gratitud cambia todo.',
    'Hoy es el mañana que ayer te preocupaba.',
    'Todo pasa por algo, confía en el proceso.',
    'Sé amable, todos estamos librando batallas.',
    'El mejor momento para empezar es ahora.',
    'No dejes para mañana lo que puedas hacer hoy.'
];

module.exports = {
    name: 'consejo',
    alias: ['tip', 'consejito'],
    async execute(sock, msg, args, { chatId }) {
        const random = consejos[Math.floor(Math.random() * consejos.length)];
        await sock.sendMessage(chatId, { 
            text: `💡 *Consejo del día:*\n\n${random}` 
        });
    }
};
