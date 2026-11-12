const SUJETOS = ['Tu vecino', 'El del kiosko', 'Tu ex', 'La vecina del 5to', 'Tu profesor', 'El panadero', 'La cajera del súper', 'Tu jefe', 'El cartero', 'Un desconocido'];
const ACCIONES = [
    'fue visto hablando solo en la calle',
    'compró 20 kilos de arroz sin razón',
    'se quedó dormido en el autobús',
    'le dijo "te amo" a un gato',
    'bailó reggaetón en el elevador',
    'perdió el celular 3 veces en un día',
    'se puso a llorar viendo un comercial',
    'gritó "VIVA" sin motivo',
    'se comió una pizza entera sin compartir',
    'le mandó un mensaje al ex por error'
];
const REMATES = [
    'Y nadie lo vio, pero pasó. 👀',
    'Fuentes confiables lo confirman. 🤫',
    'No lo digo yo, lo dice la gente. 😏',
    'Lo juro por mi gato. 🐱',
    'Esto es 100% verídico. 💯'
];

module.exports = {
    name: 'chisme',
    alias: ['chismecito', 'chismesito'],
    category: 'juegos',
    desc: 'Chisme aleatorio sin sentido',
    async execute(sock, msg, args, { chatId }) {
        const sujeto = SUJETOS[Math.floor(Math.random() * SUJETOS.length)];
        const accion = ACCIONES[Math.floor(Math.random() * ACCIONES.length)];
        const remate = REMATES[Math.floor(Math.random() * REMATES.length)];

        await sock.sendMessage(chatId, {
            text: `🗣️ *CHISME DEL DÍA*\n\n_${sujeto} ${accion}..._\n\n${remate}`
        });
    }
};
