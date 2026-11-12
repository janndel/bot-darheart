const VERDADES = [
    '¿Cuál es la parte del cuerpo de alguien que más te llama la atención?',
    '¿A quién del grupo le darías una noche sin preguntas?',
    '¿Cuál fue el lugar más raro donde te dieron un beso?',
    '¿Qué es lo más atrevido que has hecho y nadie sabe?',
    '¿A quién del grupo le mandarías un mensaje a las 3am?',
    '¿Qué te gusta que te digan cuando están a solas?',
    '¿Cuál es tu mayor debilidad cuando alguien te coquetea?',
    '¿Alguna vez has tenido un sueño con alguien del grupo?',
    '¿Cuál es la fantasía que nunca le has contado a nadie?',
    '¿Prefieres que te sorprendan o sorprender tú?',
    '¿A quién del grupo le pedirías un favor muy especial?',
    '¿Cuál ha sido la mejor noche de tu vida y con quién?',
    '¿Qué te haría caer rendido/a en una cita?',
    '¿Cuál es tu punto débil cuando alguien te habla al oído?',
    '¿Qué es lo más atrevido que harías por alguien que te gusta?'
];

module.exports = {
    name: 'verdad',
    alias: ['vyf', 'verdadoreto'],
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        const item = VERDADES[Math.floor(Math.random() * VERDADES.length)];
        
        if (mencion && mencion.length > 0) {
            const num = mencion[0].split('@')[0].split(':')[0];
            await sock.sendMessage(chatId, {
                text: `🔮 *VERDAD* para @${num}\n\n${item}`,
                mentions: [mencion[0]]
            });
        } else {
            await sock.sendMessage(chatId, {
                text: `🔮 *VERDAD*\n\n${item}`
            });
        }
    }
};
