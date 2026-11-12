const { sendReaction } = require('../../lib/anime-media');
function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }
function calcular(a, b) {
    let h = 0;
    for (let i = 0; i < (a + b).length; i++) h = (h * 31 + (a + b).charCodeAt(i)) % 1000;
    return (h % 100) + 1;
}

module.exports = {
    name: 'celos',
    alias: ['jealous', 'celitos'],
    category: 'juegos',
    desc: 'Mide los celos hacia alguien',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.' });
        }
        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const n1 = senderJid.split('@')[0];
        const n2 = targetJid.split('@')[0];
        const p = calcular(n1, n2);

        let nivel;
        if (p < 20) nivel = '😌 Nada de celos';
        else if (p < 50) nivel = '😐 Un poquito';
        else if (p < 80) nivel = '😬 Bastante';
        else nivel = '😡 ¡Muchísimo!';

        await sendReaction(sock, chatId, msg, {
            type: 'sfw',
            action: 'jealous',
            caption: `💚 *CELOS*\n\n@${n1} → @${n2}\n\n` +
                  `📊 ${p}%\n${nivel}`,
            mentions: [senderJid, targetJid]
        });
    }
};
