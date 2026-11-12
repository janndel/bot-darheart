const eco = require('../../lib/eco');

module.exports = {
    name: 'explorar',
    alias: ['excavar', 'explore'],
    category: 'economia',
    desc: 'Explorar y encontrar coins (5s) · ,explorar <apuesta> racha x2-x10',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastExplorar && ahora - user.lastExplorar < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `🧭 Aún estás lejos del campamento. Vuelve en *${eco.espera(cooldown - (ahora - user.lastExplorar))}*.`
            });
        }

        const apuesta = eco.apuestaOpcional(args, user);
        if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

        user.lastExplorar = ahora;

        if (apuesta.modo === 'apuesta') {
            const gano = eco.prob(60);
            const res = eco.resolverApuesta(user, apuesta.monto, gano, 'rachaExplorar');
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: gano
                    ? `🧭 *EXPLORACIÓN x${res.multiplicador}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y encontró un botín.\n\n🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*\n\n💰 Total: *${eco.formatear(user.coins)}*`
                    : `🍃 *EXPLORACIÓN VACÍA*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y no encontró nada.\n\n💸 Perdió su apuesta. La racha vuelve a *x2*.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        if (eco.prob(20)) {
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🍃 *EXPLORACIÓN VACÍA*\n\n@${num} caminó por horas y no encontró nada de valor.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        let ganancia = eco.azar(20, 250);
        let extra = '';
        if (eco.prob(5)) {
            const tesoro = eco.azar(500, 800);
            ganancia += tesoro;
            extra = `\n🏆 ¡Encontraste un tesoro escondido! +${eco.formatear(tesoro)} coins.`;
        }

        user.coins += ganancia;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🧭 *EXPLORACIÓN*\n\n@${num} encontró objetos por valor de *${eco.formatear(ganancia)}* coins.${extra}\n\n💰 Total: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
