const { sendReaction } = require('../../lib/anime-media');
const acciones = [
    'le dio un mordisco en el brazo a',
    'le mordió la oreja a',
    'le dio un mordisco juguetón a',
    'le mordió el cuello a',
    'le dio una mordida cariñosa a',
    'le mordió los labios a',
    'le dio un mordisco en el hombro a'
];

function limpiarJid(jid) {
    const [num, dom] = jid.split('@');
    return `${num.split(':')[0]}@${dom}`;
}

module.exports = {
    name: 'morder',
    alias: ['bite', 'mordida'],
    category: 'retos',
    desc: 'Muerde a alguien',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.\nEjemplo: ,morder @usuario' });
        }

        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const numSender = senderJid.split('@')[0];
        const numTarget = targetJid.split('@')[0];
        const accion = acciones[Math.floor(Math.random() * acciones.length)];

        await sendReaction(sock, chatId, msg, {
            type: 'sfw',
            action: 'bite',
            caption: `😈 @${numSender} ${accion} @${numTarget} 🦷`,
            mentions: [senderJid, targetJid]
        });
    }
};
