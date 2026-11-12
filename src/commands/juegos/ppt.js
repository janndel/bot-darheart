function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }
const OPCIONES = ['piedra', 'papel', 'tijera'];
const EMOJIS = { piedra: '🪨', papel: '📄', tijera: '✂️' };

function quienGana(a, b) {
    if (a === b) return 'empate';
    if ((a === 'piedra' && b === 'tijera') || (a === 'papel' && b === 'piedra') || (a === 'tijera' && b === 'papel')) return 'a';
    return 'b';
}

module.exports = {
    name: 'ppt',
    alias: ['piedrapapel', 'rps', 'pvp'],
    category: 'juegos',
    desc: 'Piedra, papel o tijera',
    async execute(sock, msg, args, { chatId }) {
        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        const eleccion = (args[0] || '').toLowerCase();

        if (!OPCIONES.includes(eleccion)) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,ppt piedra | papel | tijera' });
        }

        // vs BOT
        if (!mencion || mencion.length === 0) {
            const botEleccion = OPCIONES[Math.floor(Math.random() * 3)];
            const resultado = quienGana(eleccion, botEleccion);
            const texto = resultado === 'empate' ? '🤝 ¡Empate!' : resultado === 'a' ? '🎉 ¡Ganaste!' : '😢 Perdiste';

            return await sock.sendMessage(chatId, {
                text: `✊ *PPT vs BOT*\n\n` +
                      `👤 Tú: ${EMOJIS[eleccion]} ${eleccion}\n` +
                      `🤖 Bot: ${EMOJIS[botEleccion]} ${botEleccion}\n\n` +
                      `${texto}`
            });
        }

        // vs USUARIO
        const senderJid = limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = limpiarJid(mencion[0]);
        const n1 = senderJid.split('@')[0];
        const n2 = targetJid.split('@')[0];
        const eleccion2 = OPCIONES[Math.floor(Math.random() * 3)];
        const resultado = quienGana(eleccion, eleccion2);

        let texto;
        if (resultado === 'empate') texto = '🤝 ¡Empate!';
        else if (resultado === 'a') texto = `🏆 ¡Gana @${n1}!`;
        else texto = `🏆 ¡Gana @${n2}!`;

        await sock.sendMessage(chatId, {
            text: `✊ *PPT*\n\n` +
                  `👤 @${n1}: ${EMOJIS[eleccion]} ${eleccion}\n` +
                  `👤 @${n2}: ${EMOJIS[eleccion2]} ${eleccion2}\n\n${texto}`,
            mentions: [senderJid, targetJid]
        });
    }
};
