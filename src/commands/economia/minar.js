const eco = require('../../lib/eco');

module.exports = {
    name: 'minar',
    alias: ['mina', 'mineria', 'mine'],
    category: 'economia',
    desc: 'Minar y ganar coins (5s) · ,minar <apuesta> con racha x2-x10',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastMina && ahora - user.lastMina < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `⛏️ Tus herramientas se enfrían. Vuelve en *${eco.espera(cooldown - (ahora - user.lastMina))}*.`
            });
        }

        const apuesta = eco.apuestaOpcional(args, user);
        if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

        user.lastMina = ahora;

        if (apuesta.modo === 'apuesta') {
            const gano = eco.prob(60);
            const res = eco.resolverApuesta(user, apuesta.monto, gano, 'rachaMina');
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: gano
                    ? `⛏️ *MINERÍA x${res.multiplicador}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y encontró una veta.\n\n🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*\n\n💰 Total: *${eco.formatear(user.coins)}*`
                    : `💥 *DERRUMBE EN LA MINA*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y la mina colapsó.\n\n💸 Perdió su apuesta. La racha vuelve a *x2*.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        if (eco.prob(18)) {
            const perdida = eco.azar(50, 150);
            user.coins = Math.max(0, user.coins - perdida);
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `💥 *DERRUMBE EN LA MINA*\n\n@${num} quedó atrapado y perdió *${eco.formatear(perdida)}* coins en reparaciones.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        let ganancia = eco.azar(100, 300);
        let extra = '';
        if (eco.prob(8)) {
            const gema = eco.azar(200, 400);
            ganancia += gema;
            extra = `\n💎 ¡Encontraste una gema! +${eco.formatear(gema)} coins.`;
        }

        user.coins += ganancia;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `⛏️ *MINERÍA*\n\n@${num} picó piedra y ganó *${eco.formatear(ganancia)}* coins.${extra}\n\n💰 Total: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
