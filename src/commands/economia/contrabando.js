const eco = require('../../lib/eco');

const MERCANCIA = [
    'un cargamento de café', 'cajas de teléfonos', 'perfumes de contrabando',
    'joyas falsas', 'medicinas sin registro', 'relojes de lujo', 'zapatillas de marca'
];

module.exports = {
    name: 'contrabando',
    alias: ['smuggle', 'contrabandear'],
    category: 'economia',
    desc: 'Contrabando (5s) · ,contrabando <apuesta> racha x2-x10',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastContrabando && ahora - user.lastContrabando < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `🚚 La aduana está alerta. Espera *${eco.espera(cooldown - (ahora - user.lastContrabando))}*.`
            });
        }

        const apuesta = eco.apuestaOpcional(args, user);
        if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

        user.lastContrabando = ahora;
        const mercancia = eco.elegir(MERCANCIA);
        const exito = eco.prob(58);

        if (apuesta.modo === 'apuesta') {
            const res = eco.resolverApuesta(user, apuesta.monto, exito, 'rachaContrabando');
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: exito
                    ? `🚚 *CONTRABANDO x${res.multiplicador}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y pasó ${mercancia}.\n\n🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*\n\n💰 Total: *${eco.formatear(user.coins)}*`
                    : `🚨 *LO CONFISCARON*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins e intentó pasar ${mercancia}.\n\n💸 Perdió su apuesta. La racha vuelve a *x2*.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        let texto;
        if (exito) {
            const ganancia = eco.azar(250, 700);
            user.coins += ganancia;
            texto = `🚚 *CONTRABANDO EXITOSO*\n\n@${num} pasó ${mercancia} sin problemas y ganó *${eco.formatear(ganancia)}* coins.\n\n💰 Total: *${eco.formatear(user.coins)}*`;
        } else {
            const perdida = eco.azar(150, 450);
            user.coins = Math.max(0, user.coins - perdida);
            texto = `🚨 *LO CONFISCARON*\n\n@${num} intentó pasar ${mercancia} pero la aduana lo atrapó.\n💸 Pérdida: *${eco.formatear(perdida)}* coins.\n\n💰 Total: *${eco.formatear(user.coins)}*`;
        }

        eco.guardar(data);
        await sock.sendMessage(chatId, { text: texto, mentions: [senderJid] });
    }
};
