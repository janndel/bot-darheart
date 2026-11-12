const eco = require('../../lib/eco');

module.exports = {
    name: 'cofre',
    alias: ['caja', 'chest', 'coffer'],
    category: 'economia',
    desc: 'Abrir un cofre cada 5s · ,cofre <apuesta> racha x2-x10',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastCofre && ahora - user.lastCofre < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `🔒 El cofre está sellado. Vuelve en *${eco.espera(cooldown - (ahora - user.lastCofre))}*.`
            });
        }

        const apuesta = eco.apuestaOpcional(args, user);
        if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

        user.lastCofre = ahora;

        if (apuesta.modo === 'apuesta') {
            const gano = eco.prob(55);
            const res = eco.resolverApuesta(user, apuesta.monto, gano, 'rachaCofre');
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: gano
                    ? `🎁 *COFRE x${res.multiplicador}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y abrió un cofre.\n\n🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*\n\n💰 Total: *${eco.formatear(user.coins)}*`
                    : `🔒 *COFRE VACÍO*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y el cofre no tenía nada.\n\n💸 Perdió su apuesta. La racha vuelve a *x2*.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        let ganancia = eco.azar(100, 800);
        let extra = '';

        if (eco.prob(10)) {
            ganancia *= 2;
            extra = '\n✨ ¡El cofre estaba encantado! Recompensa duplicada.';
        }

        if (eco.prob(8)) {
            if (!user.items) user.items = [];
            user.items.push('diamante');
            extra += '\n💎 ¡También encontraste un diamante!';
        }

        user.coins += ganancia;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🎁 *COFRE*\n\n@${num} abrió un cofre y ganó *${eco.formatear(ganancia)}* coins.${extra}\n\n💰 Total: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
