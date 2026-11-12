const { sendReaction } = require('../../lib/anime-media');
const ACCIONES = [
    'abrazó por detrás a',
    'se pegó bien cerquita a',
    'le dio un abrazo que duró más de lo normal a',
    'le susurró al oído mientras la abrazaba a',
    'la jaló de la cintura para abrazarla a',
    'se acurrucó contra',
    'le dio un abrazo de esos que dicen más que las palabras a',
    'la abrazó tan fuerte que no la dejaba ir a',
    'le hizo cucharita a',
    'la envolvió con los brazos y no la soltó a'
];

function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }

module.exports = {
    name: 'abrazo',
    alias: ['abrazar', 'cuddle'],
    category: 'retos',
    desc: 'Abraza a alguien',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.' });
        }
        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const numS = senderJid.split('@')[0];
        const numT = targetJid.split('@')[0];
        const accion = ACCIONES[Math.floor(Math.random() * ACCIONES.length)];

        await sendReaction(sock, chatId, msg, {
            type: 'sfw',
            action: 'hug',
            caption: `🫂 @${numS} ${accion} @${numT} 💕`,
            mentions: [senderJid, targetJid]
        });
    }
};
