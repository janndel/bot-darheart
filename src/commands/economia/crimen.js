const eco = require('../../lib/eco');

const crimenes = [
    'robaste un banco', 'atracaste una tienda', 'vendiste cosas robadas',
    'estafaste a un turista', 'hackeaste una cuenta', 'secuestraste un perro (y lo devolviste)',
    'traficaste con empanadas', 'sobornaste a un policía', 'falsificaste billetes'
];

module.exports = {
    name: 'crimen',
    alias: ['crime', 'delinquir'],
    category: 'economia',
    desc: 'Crimen (5s) · ,crimen <apuesta> racha x2-x10',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastCrime && ahora - user.lastCrime < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `🚔 La policía te está buscando. Vuelve en *${eco.espera(cooldown - (ahora - user.lastCrime))}*.`
            });
        }

        const apuesta = eco.apuestaOpcional(args, user);
        if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

        const exito = eco.prob(60);
        const crimen = eco.elegir(crimenes);
        user.lastCrime = ahora;

        if (apuesta.modo === 'apuesta') {
            const res = eco.resolverApuesta(user, apuesta.monto, exito, 'rachaCrimen');
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: exito
                    ? `🕵️ *CRIMEN x${res.multiplicador}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y ${crimen}.\n\n🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*\n\n💰 Total: *${eco.formatear(user.coins)}*`
                    : `🚨 *TE ATRAPARON*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins e intentó ${crimen}.\n\n💸 Perdió su apuesta. La racha vuelve a *x2*.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        let texto;
        if (exito) {
            const ganancia = eco.azar(200, 500);
            user.coins += ganancia;
            texto = `🕵️ *CRIMEN EXITOSO*\n\n@${num} ${crimen} y ganó *${eco.formatear(ganancia)}* coins.\n\n💰 Total: *${eco.formatear(user.coins)}*`;
        } else {
            const multa = eco.azar(100, 300);
            user.coins = Math.max(0, user.coins - multa);
            texto = `🚨 *TE ATRAPARON*\n\n@${num} intentó ${crimen} pero lo atraparon.\n💸 Multa: *${eco.formatear(multa)}* coins.\n\n💰 Total: *${eco.formatear(user.coins)}*`;
        }

        eco.guardar(data);
        await sock.sendMessage(chatId, { text: texto, mentions: [senderJid] });
    }
};
