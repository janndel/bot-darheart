const BROMAS = [
    'Llamé a un número equivocado y me contestó mi ex. 👻',
    'Iba a contar un chiste pero no me acuerdo. 😅',
    'Mi vida amorosa es como el WiFi: siempre buscando señal. 📶',
    'Mi dieta empieza mañana. Llevo 5 años diciendo eso. 🍔',
    'Me dijeron "sé tú mismo" y me despidieron. 🤷',
    'Tengo memoria de pez: cada 3 segundos olvido por qué entré al cuarto. 🐟',
    'Mi hobby favorito es dormir. Y mi talento, dormir más. 😴',
    'Me gusta pensar que soy multitarea, pero solo hago una cosa a la vez... mal. 😂',
    'El único ejercicio que hago es saltar a conclusiones. 🏃',
    'Mi relación más larga ha sido con el refrigerador. ❤️🍕'
];

module.exports = {
    name: 'broma',
    alias: ['chiste2', 'humor'],
    category: 'general',
    desc: 'Broma aleatoria',
    async execute(sock, msg, args, { chatId }) {
        const broma = BROMAS[Math.floor(Math.random() * BROMAS.length)];
        await sock.sendMessage(chatId, { text: `😂 *BROMA*\n\n${broma}` });
    }
};
