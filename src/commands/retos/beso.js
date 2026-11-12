const { sendReaction } = require('../../lib/anime-media');
const ACCIONES = [
    'le dio un beso en el cuello a',
    'le robó un beso lento a',
    'le dio un beso que dejó sin aliento a',
    'le besó la oreja mientras le susurraba a',
    'le dio un beso de esos que no se olvidan a',
    'le dio un beso sin previo aviso a',
    'le dio un beso que se sintió en todo el cuerpo a',
    'le besó hasta que se le olvidó el nombre a',
    'le dio un beso que prometía más a',
    'le besó con una intensidad peligrosa a'
];

function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }

module.exports = {
    name: 'beso',
    alias: ['besito', 'kiss'],
    category: 'retos',
    desc: 'Besa a alguien',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.\nEjemplo: ,beso @usuario' });
        }
        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const numS = senderJid.split('@')[0], numT = targetJid.split('@')[0];
        const accion = ACCIONES[Math.floor(Math.random() * ACCIONES.length)];
        await sendReaction(sock, chatId, msg, {
            type: 'sfw',
            action: 'kiss',
            caption: `💋 @${numS} ${accion} @${numT}\n\n_¿Y después qué pasó?_ 🥵`,
            mentions: [senderJid, targetJid]
        });
    }
};
