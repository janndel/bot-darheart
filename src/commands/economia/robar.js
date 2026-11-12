const eco = require('../../lib/eco');

module.exports = {
    name: 'robar',
    alias: ['atracar', 'steal', 'rob'],
    category: 'economia',
    desc: 'Intentar robar coins (5s)',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const menciones = eco.mencionados(msg);
        if (menciones.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,robar @usuario' });
        }

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = eco.limpiarJid(menciones[0]);
        const numSender = eco.numero(senderJid);
        const numTarget = eco.numero(targetJid);

        if (numSender === numTarget) {
            return await sock.sendMessage(chatId, { text: '⚠️ No te robes a ti mismo.' });
        }

        const data = eco.cargar();
        const ladron = eco.usuario(data, chatId, numSender);
        const victima = eco.usuario(data, chatId, numTarget);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (ladron.lastRob && ahora - ladron.lastRob < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `🕵️ La policía te vigila. Espera *${eco.espera(cooldown - (ahora - ladron.lastRob))}*.`
            });
        }

        if (eco.seguroActivo(victima)) {
            ladron.lastRob = ahora;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🛡️ @${numTarget} tiene seguro activo. @${numSender} no pudo robarle nada.`,
                mentions: [senderJid, targetJid]
            });
        }

        if (victima.coins < 50) {
            return await sock.sendMessage(chatId, {
                text: `😅 @${numTarget} es más pobre que tú. No vale la pena.`,
                mentions: [targetJid]
            });
        }

        ladron.lastRob = ahora;
        const exito = eco.prob(50);

        let texto;
        if (exito) {
            const robado = Math.max(1, Math.floor(victima.coins * 0.15));
            victima.coins -= robado;
            ladron.coins += robado;
            texto = `🦹 *ROBO EXITOSO*\n\n@${numSender} le robó *${eco.formatear(robado)}* coins a @${numTarget}.\n\n💰 @${numSender}: *${eco.formatear(ladron.coins)}*\n💸 @${numTarget}: *${eco.formatear(victima.coins)}*`;
        } else {
            const multa = 100;
            ladron.coins = Math.max(0, ladron.coins - multa);
            texto = `🚔 *TE ATRAPARON*\n\n@${numSender} intentó robar a @${numTarget} pero lo atraparon.\n💸 Multa: *${eco.formatear(multa)}* coins.\n\n💰 Total: *${eco.formatear(ladron.coins)}*`;
        }

        eco.guardar(data);
        await sock.sendMessage(chatId, { text: texto, mentions: [senderJid, targetJid] });
    }
};
