const OPCIONES = [
    // Retos atrevidos
    { tipo: '💋 RETO', texto: 'Dile a alguien del grupo qué le harías si estuvieran solos 5 minutos.' },
    { tipo: '🔥 RETO', texto: 'Manda un audio al oído diciendo algo que no dirías en público.' },
    { tipo: '💋 RETO', texto: 'Dile a 3 personas del grupo cuál es su mejor atributo.' },
    { tipo: '🥵 RETO', texto: 'Confiesa a quién del grupo le darías un beso ahora mismo.' },
    { tipo: '💋 RETO', texto: 'Escribe una frase con doble sentido y mándala al grupo.' },
    { tipo: '🔥 RETO', texto: 'Dile al grupo cuál es tu tipo ideal y a quién se parece.' },
    { tipo: '🥵 RETO', texto: 'Dile a alguien a qué hora te gustaría verlo/a a solas.' },
    { tipo: '💋 RETO', texto: 'Cuenta cuál ha sido tu cita más atrevida.' },
    { tipo: '🔥 RETO', texto: 'Dile a 2 personas qué les pedirías si te dieran un deseo.' },
    { tipo: '🥵 RETO', texto: 'Dile al grupo qué te gustaría que te hicieran ahora mismo.' },
    
    // Verdades atrevidas
    { tipo: '🔮 VERDAD', texto: '¿Cuál es la parte del cuerpo de alguien que más te llama la atención?' },
    { tipo: '🔮 VERDAD', texto: '¿A quién del grupo le darías una noche sin preguntas?' },
    { tipo: '🔮 VERDAD', texto: '¿Cuál fue el lugar más raro donde te dieron un beso?' },
    { tipo: '🔮 VERDAD', texto: '¿Qué es lo más atrevido que has hecho y nadie sabe?' },
    { tipo: '🔮 VERDAD', texto: '¿A quién del grupo le mandarías un mensaje a las 3am?' },
    { tipo: '🔮 VERDAD', texto: '¿Qué te gusta que te digan cuando están a solas?' },
    { tipo: '🔮 VERDAD', texto: '¿Cuál es tu mayor debilidad cuando alguien te coquetea?' },
    { tipo: '🔮 VERDAD', texto: '¿Alguna vez has tenido un sueño con alguien del grupo?' },
    { tipo: '🔮 VERDAD', texto: '¿Cuál es la fantasía que nunca le has contado a nadie?' },
    { tipo: '🔮 VERDAD', texto: '¿Cuál es tu punto débil cuando alguien te habla al oído?' }
];

module.exports = {
    name: 'ruleta',
    alias: ['girar'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }
        const opcion = OPCIONES[Math.floor(Math.random() * OPCIONES.length)];
        await sock.sendMessage(chatId, {
            text: `🎰 *RULETA*\n\n${opcion.tipo}\n\n${opcion.texto}`
        });
    }
};
