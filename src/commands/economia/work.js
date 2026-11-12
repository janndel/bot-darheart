const eco = require('../../lib/eco');

const trabajos = [
    'repartiste pizzas', 'limpiaste una oficina', 'paseaste perros',
    'vendiste empanadas', 'arreglaste un carro', 'pintaste una casa',
    'atendiste una tienda', 'cargaste cajas', 'lavaste ropa ajena',
    'cuidaste niños', 'reparaste computadoras', 'diste clases particulares'
];

module.exports = {
    name: 'work',
    alias: ['trabajar', 'chamba', 'w', 'chambear'],
    category: 'economia',
    desc: 'Trabajar y ganar coins (5s) · ,work <apuesta> racha x2-x10',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastWork && ahora - user.lastWork < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `⏳ Descansa un poco. Vuelve en *${eco.espera(cooldown - (ahora - user.lastWork))}*.`
            });
        }

        const apuesta = eco.apuestaOpcional(args, user);
        if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

        if (apuesta.modo === 'apuesta') {
            const gano = eco.prob(60);
            const res = eco.resolverApuesta(user, apuesta.monto, gano, 'rachaWork');
            user.lastWork = ahora;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: gano
                    ? `💼 *TRABAJO x${res.multiplicador}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y consiguió un buen trabajo.\n\n🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*\n\n💰 Total: *${eco.formatear(user.coins)}*`
                    : `💼 *SIN TRABAJO*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y no consiguió nada.\n\n💸 Perdió su apuesta. La racha vuelve a *x2*.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        let ganancia = eco.azar(50, 200);
        let extra = '';
        if (Number(user.multiplicador) > 1) {
            ganancia *= Number(user.multiplicador);
            extra = `\n✨ Multiplicador x${user.multiplicador} aplicado.`;
            delete user.multiplicador;
        }

        const trabajo = eco.elegir(trabajos);
        user.coins += ganancia;
        user.lastWork = ahora;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `💼 *TRABAJO*\n\n@${num} ${trabajo} y ganó *${eco.formatear(ganancia)}* DARHEART coins.${extra}\n\n💰 Total: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
