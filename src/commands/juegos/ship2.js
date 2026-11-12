function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }
function calcular(a, b) {
    const key = [a, b].sort().join('-');
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 1000000;
    return (h % 100) + 1;
}

module.exports = {
    name: 'ship2',
    alias: ['shippear2', 'amor2'],
    category: 'juegos',
    desc: 'Ship atrevido entre 2 personas',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length < 2) {
            return await sock.sendMessage(chatId, { text: '⚠️ Menciona a 2 personas.' });
        }
        const u1 = limpiarJid(mencion[0]);
        const u2 = limpiarJid(mencion[1]);
        const n1 = u1.split('@')[0];
        const n2 = u2.split('@')[0];
        const p = calcular(n1, n2);

        let frase;
        if (p >= 90) frase = '💍 ¡Ya pueden casarse!';
        else if (p >= 70) frase = '🥵 ¡Se comen con la mirada!';
        else if (p >= 50) frase = '😏 Hay algo ahí, se nota.';
        else if (p >= 30) frase = '🤔 Podría funcionar con ganas.';
        else frase = '😬 Mejor como amigos.';

        await sock.sendMessage(chatId, {
            text: `💘 *SHIP ATREVIDO*\n\n` +
                  `👤 @${n1}\n❤️ +\n👤 @${n2}\n\n` +
                  `⚡ *${p}%*\n${frase}`,
            mentions: [u1, u2]
        });
    }
};
