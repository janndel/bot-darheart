const FRASES = [
    'Si te dijera que tienes algo especial, ¿me creerías?',
    'No sé si eres tú o el ambiente, pero me estás gustando.',
    '¿Te puedo invitar algo o prefieres que primero te conquiste?',
    'Tienes cara de que te gusta la gente atrevida.',
    'Me gusta cómo suenas, ¿cómo se ve un "sí"?',
    'Estás peligrosa/o hoy, ¿lo sabes?',
    'Si te doy mi número, ¿lo usarías?',
    'No te conozco y ya quiero repetir.',
    'Me encanta la gente que no se hace la difícil.',
    'Dime algo y te digo si me convences.'
];
function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }

module.exports = {
    name: 'ligar',
    alias: ['flirt', 'coquetear'],
    category: 'retos',
    desc: 'Frase para ligar a alguien',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.' });
        }
        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const numS = senderJid.split('@')[0];
        const numT = targetJid.split('@')[0];
        const frase = FRASES[Math.floor(Math.random() * FRASES.length)];

        await sock.sendMessage(chatId, {
            text: `😏 @${numS} a @${numT}:\n\n_"${frase}"_`,
            mentions: [senderJid, targetJid]
        });
    }
};
