const eco = require('../../lib/eco');

module.exports = {
    name: 'hackear',
    alias: ['hack', 'hackeo'],
    category: 'economia',
    desc: 'Hackear el banco de otro usuario (5s)',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const menciones = eco.mencionados(msg);
        if (menciones.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,hackear @usuario' });
        }

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = eco.limpiarJid(menciones[0]);
        const numSender = eco.numero(senderJid);
        const numTarget = eco.numero(targetJid);

        if (numSender === numTarget) {
            return await sock.sendMessage(chatId, { text: '⚠️ No puedes hackearte a ti mismo.' });
        }

        const data = eco.cargar();
        const hacker = eco.usuario(data, chatId, numSender);
        const victima = eco.usuario(data, chatId, numTarget);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (hacker.lastHack && ahora - hacker.lastHack < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `💻 Tu VPN sigue rastreando. Espera *${eco.espera(cooldown - (ahora - hacker.lastHack))}*.`
            });
        }

        if ((victima.banco || 0) < 200) {
            return await sock.sendMessage(chatId, {
                text: `😅 @${numTarget} no tiene suficiente en el banco para hackear.`,
                mentions: [targetJid]
            });
        }

        if (eco.seguroActivo(victima)) {
            hacker.lastHack = ahora;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🛡️ @${numTarget} tiene seguro activo. @${numSender} no pudo hackear su banco.`,
                mentions: [senderJid, targetJid]
            });
        }

        hacker.lastHack = ahora;
        const exito = eco.prob(45);

        let texto;
        if (exito) {
            const robado = Math.max(1, Math.floor(victima.banco * eco.azar(5, 15) / 100));
            victima.banco -= robado;
            hacker.coins += robado;
            texto = `💻 *HACKEO EXITOSO*\n\n@${numSender} hackeó el banco de @${numTarget} y robó *${eco.formatear(robado)}* coins.\n\n💰 @${numSender}: *${eco.formatear(hacker.coins)}*\n🏦 @${numTarget}: *${eco.formatear(victima.banco)}*`;
        } else {
            const multa = eco.azar(150, 400);
            hacker.coins = Math.max(0, hacker.coins - multa);
            texto = `🚨 *HACKEO FALLIDO*\n\n@${numSender} intentó hackear a @${numTarget} pero fue rastreado.\n💸 Multa: *${eco.formatear(multa)}* coins.\n\n💰 Total: *${eco.formatear(hacker.coins)}*`;
        }

        eco.guardar(data);
        await sock.sendMessage(chatId, { text: texto, mentions: [senderJid, targetJid] });
    }
};
