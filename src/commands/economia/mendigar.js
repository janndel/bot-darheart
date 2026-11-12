const eco = require('../../lib/eco');

module.exports = {
    name: 'mendigar',
    alias: ['beg', 'limosna'],
    category: 'economia',
    desc: 'Pedir limosna (5s) · ,mendigar <apuesta> racha x2-x10',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastMendigar && ahora - user.lastMendigar < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `🥺 Ya pediste hace poco. Espera *${eco.espera(cooldown - (ahora - user.lastMendigar))}*.`
            });
        }

        const apuesta = eco.apuestaOpcional(args, user);
        if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

        user.lastMendigar = ahora;

        if (apuesta.modo === 'apuesta') {
            const gano = eco.prob(60);
            const res = eco.resolverApuesta(user, apuesta.monto, gano, 'rachaMendigar');
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: gano
                    ? `🥺 *MENDICIDAD x${res.multiplicador}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y recibió una buena limosna.\n\n🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*\n\n💰 Total: *${eco.formatear(user.coins)}*`
                    : `😔 *NADIE TE DIO NADA*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y todos lo ignoraron.\n\n💸 Perdió su apuesta. La racha vuelve a *x2*.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        if (eco.prob(15)) {
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `😔 *NADIE TE DIO NADA*\n\n@${num} mendigó pero todos lo ignoraron.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        const ganancia = eco.azar(10, 80);
        user.coins += ganancia;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🥺 *MENDICIDAD*\n\n@${num} recibió *${eco.formatear(ganancia)}* coins de limosna.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
