const frases = [
    'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
    'No cuentes los días, haz que los días cuenten.',
    'La mejor manera de predecir el futuro es crearlo.',
    'El único modo de hacer un gran trabajo es amar lo que haces.',
    'No dejes que el ayer ocupe demasiado del hoy.',
    'La disciplina es el puente entre metas y logros.',
    'Si puedes soñarlo, puedes hacerlo.',
    'El que quiere, puede. El que puede, lo hace.',
    'Cada día es una nueva oportunidad para cambiar tu vida.',
    'El fracaso es la oportunidad de empezar de nuevo con más inteligencia.',
    'Sé el cambio que quieres ver en el mundo.',
    'Lo que no te mata, te hace más fuerte.',
    'La vida es 10% lo que te pasa y 90% cómo reaccionas.',
    'No esperes el momento perfecto, toma el momento y hazlo perfecto.',
    'El único límite es el que tú mismo te pones.',
    'Rodéate de personas que te hagan mejor.',
    'Si quieres ir rápido, ve solo. Si quieres llegar lejos, ve acompañado.',
    'El conocimiento es poder, pero el carácter es más importante.',
    'Nunca es tarde para ser lo que podrías haber sido.',
    'Hoy es el primer día del resto de tu vida.'
];

module.exports = {
    name: 'frase',
    alias: ['motivacion', 'motivacional'],
    async execute(sock, msg, args, { chatId }) {
        const frase = frases[Math.floor(Math.random() * frases.length)];
        await sock.sendMessage(chatId, { text: `💭 *Frase del día*\n\n_"${frase}"_` });
    }
};
