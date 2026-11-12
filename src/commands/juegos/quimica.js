function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }
function calcular(a, b) {
    const key = [a, b].sort().join('-');
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 1000000;
    return (h % 100) + 1;
}

module.exports = {
    name: 'quimica',
    alias: ['chemistry', 'chispa'],
    category: 'juegos',
    desc: 'Mide la química entre 2 personas',
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
        const bloques = Math.round(p / 5);
        const barra = '█'.repeat(bloques) + '░'.repeat(20 - bloques);

        await sock.sendMessage(chatId, {
            text: `💫 *QUÍMICA*\n\n` +
                  `@${n1} + @${n2}\n\n` +
                  `[${barra}]\n` +
                  `⚡ *${p}%* de química`,
            mentions: [u1, u2]
        });
    }
};
