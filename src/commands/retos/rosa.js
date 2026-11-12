function limpiarJid(jid) {
    const [num, dom] = jid.split('@');
    return `${num.split(':')[0]}@${dom}`;
}

module.exports = {
    name: 'rosa',
    alias: ['regalarosa', 'flor'],
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.\nEjemplo: ,rosa @usuario' });
        }

        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const numSender = senderJid.split('@')[0];
        const numTarget = targetJid.split('@')[0];

        const frases = [
            'Una rosa para la persona más especial del grupo.',
            'Con cariño, esta rosa es para ti.',
            'Un detalle para alegrar tu día.',
            'Porque te lo mereces.',
            'Un símbolo de amistad y cariño.'
        ];
        const frase = frases[Math.floor(Math.random() * frases.length)];

        await sock.sendMessage(chatId, {
            text: `🌹 @${numSender} le regaló una rosa a @${numTarget} 💐\n\n_"${frase}"_`,
            mentions: [senderJid, targetJid]
        });
    }
};
