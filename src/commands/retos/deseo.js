const DESEOS = [
    'una noche sin reglas',
    'un beso que dure una hora',
    'una cita sorpresa',
    'un mensaje a las 3am',
    'un abrazo por detrás',
    'una confesión sincera',
    'un baile lento pegado',
    'una escapada de fin de semana',
    'un audio susurrado',
    'una sorpresa bajo la almohada'
];
function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }

module.exports = {
    name: 'deseo',
    alias: ['wish', 'deseito'],
    category: 'retos',
    desc: 'Dile qué le pedirías a alguien',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.' });
        }
        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const n1 = senderJid.split('@')[0];
        const n2 = targetJid.split('@')[0];
        const deseo = DESEOS[Math.floor(Math.random() * DESEOS.length)];

        await sock.sendMessage(chatId, {
            text: `✨ @${n1} le pediría a @${n2}:\n\n_"${deseo}"_`,
            mentions: [senderJid, targetJid]
        });
    }
};
