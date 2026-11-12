const { sendReaction } = require('../../lib/anime-media');
const acciones = [
    'le dio un beso en la mejilla a',
    'le dio un beso apasionado a',
    'le robó un beso a',
    'le dio un beso en la frente a',
    'le plantó un beso sorpresa a',
    'le dio un beso de película a',
    'le dio un beso en el cuello a',
    'le dio un beso largo y profundo a'
];

function limpiarJid(jid) {
    const [num, dom] = jid.split('@');
    return `${num.split(':')[0]}@${dom}`;
}

module.exports = {
    name: 'besar',
    alias: [],
    category: 'retos',
    desc: 'Besa a alguien',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.\nEjemplo: ,besar @usuario' });
        }

        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const numSender = senderJid.split('@')[0];
        const numTarget = targetJid.split('@')[0];
        const accion = acciones[Math.floor(Math.random() * acciones.length)];

        await sendReaction(sock, chatId, msg, {
            type: 'sfw',
            action: 'kiss',
            caption: `😘 @${numSender} ${accion} @${numTarget} 💋`,
            mentions: [senderJid, targetJid]
        });
    }
};
