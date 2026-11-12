const RETOS = [
    'Manda un audio susurrando al oído algo atrevido.',
    'Dile a alguien del grupo qué es lo primero que le mirarías.',
    'Confiesa cuál es tu mayor punto débil cuando te coquetean.',
    'Dile a alguien del grupo a qué hora te gustaría verlo/a a solas.',
    'Manda un sticker que represente lo que piensas ahora mismo.',
    'Dile al grupo cuál es el lugar más atrevido donde has estado.',
    'Escribe una frase con doble sentido y mándala al grupo.',
    'Cuenta cuál ha sido tu cita más atrevida.',
    'Dile a 2 personas del grupo qué les pedirías si te dieran un deseo.',
    'Dile al grupo qué te gustaría que te hicieran ahora mismo.',
    'Manda una foto de algo que te recuerde a alguien del grupo.',
    'Confiesa a quién del grupo le darías un beso ahora.',
    'Dile a alguien qué es lo que más te llama la atención de él/ella.',
    'Cuenta cuál ha sido el mensaje más atrevido que has recibido.',
    'Dile al grupo qué te haría caer rendido/a en una cita.',
    'Manda un audio con tu mejor tono de coqueteo.',
    'Dile a alguien qué le dirías si estuvieran solos 5 minutos.',
    'Confiesa cuál fue tu mejor noche y con quién.',
    'Dile al grupo cuál es tu fantasía más rara.',
    'Manda un mensaje que solo entendería quien tenga mente sucia.'
];

function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }

module.exports = {
    name: 'reto3',
    alias: ['retoatrevido', 'retofuerte'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }
        try {
            const metadata = await sock.groupMetadata(chatId);
            const participantes = metadata.participants.map(p => limpiarJid(p.id));
            if (participantes.length === 0) return;

            const elegidoJid = participantes[Math.floor(Math.random() * participantes.length)];
            const numElegido = elegidoJid.split('@')[0];
            const reto = RETOS[Math.floor(Math.random() * RETOS.length)];

            await sock.sendMessage(chatId, {
                text: `🔥 *RETO ATREVIDO*\n\n🎰 Elegido: @${numElegido}\n\n${reto}\n\n_⏱️ Tienes 5 minutos_`,
                mentions: [elegidoJid]
            });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
