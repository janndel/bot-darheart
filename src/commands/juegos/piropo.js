const piropos = [
    '¿Tienes un mapa? Porque me perdí en tus ojos.',
    'Si la belleza fuera tiempo, serías la eternidad.',
    '¿Crees en amor a primera vista o tengo que pasar otra vez?',
    'Eres como el café: fuerte, caliente y adictiva.',
    'Si fueras un vegetal, serías una zanahoria, porque te veo dulce.',
    '¿Tienes WiFi? Porque siento una conexión.',
    'No soy fotógrafo, pero puedo imaginarnos juntos.',
    'Eres la razón por la que creo en los ángeles.',
    '¿De qué signo eres? Porque te ves como mi media naranja.',
    'Si el amor es ciego, quiero ser ciego contigo.',
    'Eres como una estrella: brillas sin esfuerzo.',
    '¿Tienes un lápiz? Porque quiero escribirte en mi futuro.',
    'No eres Google, pero tienes todo lo que busco.',
    'Eres la excepción a todas mis reglas.',
    'Si tuviera que elegir entre dormir y verte, elegiría verte dormir.',
    'Tu sonrisa es mi vitamina diaria.',
    'Eres el chocolate de mi vida: dulce y adictiva.',
    '¿Eres un imán? Porque me atraes sin querer.',
    'Contigo, hasta un día lluvioso se ve perfecto.',
    'Eres el sol que ilumina mis días.'
];

module.exports = {
    name: 'piropo',
    alias: ['romantico'],
    async execute(sock, msg, args, { chatId }) {
        const piropo = piropos[Math.floor(Math.random() * piropos.length)];
        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        
        if (mencion && mencion.length > 0) {
            const user = mencion[0];
            const num = user.split('@')[0].split(':')[0];
            await sock.sendMessage(chatId, {
                text: `💕 @${num}, ${piropo}`,
                mentions: [user]
            });
        } else {
            await sock.sendMessage(chatId, { text: `💕 ${piropo}` });
        }
    }
};
