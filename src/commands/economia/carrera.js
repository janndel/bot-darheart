const eco = require('../../lib/eco');

const CABALLOS = [
    { nombre: 'Rayo', emoji: '🐎', peso: 30, cuota: 3 },
    { nombre: 'Tormenta', emoji: '🏇', peso: 25, cuota: 4 },
    { nombre: 'Fantasma', emoji: '🐎', peso: 20, cuota: 5 },
    { nombre: 'Cometa', emoji: '🏇', peso: 15, cuota: 7 },
    { nombre: 'Relámpago', emoji: '🐎', peso: 10, cuota: 9 }
];

function ganador() {
    const tirada = eco.azar(1, 100);
    let acumulado = 0;
    for (let i = 0; i < CABALLOS.length; i++) {
        acumulado += CABALLOS[i].peso;
        if (tirada <= acumulado) return i;
    }
    return CABALLOS.length - 1;
}

module.exports = {
    name: 'carrera',
    alias: ['caballos', 'horse'],
    category: 'economia',
    desc: 'Apostar a una carrera de caballos',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const elegido = parseInt(args[0], 10);
        if (!Number.isFinite(elegido) || elegido < 1 || elegido > CABALLOS.length) {
            const lista = CABALLOS.map((c, i) => `${i + 1}. ${c.emoji} ${c.nombre} (x${c.cuota})`).join('\n');
            return await sock.sendMessage(chatId, {
                text: `🏁 *CARRERA*\n\n${lista}\n\n⚠️ Uso: ,carrera <1-5> <apuesta>\nEjemplo: ,carrera 2 100`
            });
        }

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);

        const restante = eco.cooldownRestante(user, 'lastCarrera');
        if (restante > 0) return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para apostar de nuevo.` });

        const apuesta = eco.parsearCantidad(args[1], user.coins);
        if (!apuesta) return await sock.sendMessage(chatId, { text: '⚠️ Pon una apuesta válida.' });
        if (user.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        eco.marcarCooldown(user, 'lastCarrera');
        const indiceGanador = ganador();
        const caballo = CABALLOS[elegido - 1];
        const gano = elegido - 1 === indiceGanador;
        const pago = gano ? apuesta * caballo.cuota : 0;

        user.coins += gano ? pago : -apuesta;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🏁 *CARRERA*\n\n@${num} apostó por ${caballo.emoji} *${caballo.nombre}* (x${caballo.cuota}) con *${eco.formatear(apuesta)}* coins.\n\n🥇 Ganador: ${CABALLOS[indiceGanador].emoji} *${CABALLOS[indiceGanador].nombre}*\n\n${gano ? `🎉 ¡Ganaste *${eco.formatear(pago)}* coins!` : `💸 Perdiste *${eco.formatear(apuesta)}* coins.`}\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
