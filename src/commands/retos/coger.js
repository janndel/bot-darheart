const { sendReaction } = require('../../lib/anime-media');
const acciones = [
    'se llevó a la cama a',
    'le dio duro toda la noche a',
    'se comió enter@ a',
    'le hizo el amor salvajemente a',
    'se l@ cogió sin piedad a',
    'le dio hasta que le pidió más a',
    'l@ puso en cuatro a',
    'le hizo gemir a',
    'se l@ folló rico a',
    'le dio por todos lados a',
    'se cogio a',
    'le partio el chiquito a'
];

function limpiarJid(jid) {
    const [num, dom] = jid.split('@');
    return `${num.split(':')[0]}@${dom}`;
}

module.exports = {
    name: 'coger',
    alias: ['follar', 'cogerselo', 'comer'],
    category: 'retos',
    desc: 'Acción NSFW con alguien',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.\nEjemplo: ,coger @usuario' });
        }

        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const numSender = senderJid.split('@')[0];
        const numTarget = targetJid.split('@')[0];
        const accion = acciones[Math.floor(Math.random() * acciones.length)];

        await sendReaction(sock, chatId, msg, {
            type: 'nsfw',
            action: 'fuck',
            caption: `🥵 @${numSender} ${accion} @${numTarget} 🔥`,
            mentions: [senderJid, targetJid]
        });
    }
};
