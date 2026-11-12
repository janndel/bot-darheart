const PIROPOS = [
    'Si te tuviera enfrente, no respondería por mí.',
    'Tienes cara de causar problemas y yo de dejarte.',
    'Contigo hasta perder el control se ve tentador.',
    'No sé si quiero hablarte o quedarme mirándote en silencio.',
    'Me gusta cómo suenas cuando dices mi nombre.',
    'Estás hecha para romper corazones y no te culpo.',
    'Si te diera un beso, te aviso: no sería corto.',
    'Me pones nervioso/a y no es por el café.',
    'Tienes esa mirada que dice "ven" sin hablar.',
    'Si estuvieras aquí, te diría cosas al oído.',
    'Me gusta la idea de coincidir contigo a solas.',
    'Esa sonrisa debería venir con advertencia.',
    'No te conozco y ya te extraño.',
    'Tienes el tipo de voz que se queda en la cabeza.',
    'Si te invito una copa, ¿después qué?'
];

module.exports = {
    name: 'piropo2',
    alias: ['flirt2', 'picante'],
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        const piropo = PIROPOS[Math.floor(Math.random() * PIROPOS.length)];

        if (mencion && mencion.length > 0) {
            const num = mencion[0].split('@')[0].split(':')[0];
            await sock.sendMessage(chatId, {
                text: `😏 @${num}, ${piropo}`,
                mentions: [mencion[0]]
            });
        } else {
            await sock.sendMessage(chatId, { text: `😏 ${piropo}` });
        }
    }
};
