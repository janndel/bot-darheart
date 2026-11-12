const eco = require('../../lib/eco');

const ROJOS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

function colorDe(n) {
    if (n === 0) return 'verde';
    return ROJOS.has(n) ? 'rojo' : 'negro';
}

module.exports = {
    name: 'ruletacasino',
    alias: ['roulette', 'casinoruleta'],
    category: 'economia',
    desc: 'Ruleta: apuesta color o número',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const opcion = (args[0] || '').toLowerCase();
        let tipo = '';
        let valor = '';

        if (['rojo', 'negro', 'verde'].includes(opcion)) {
            tipo = 'color';
            valor = opcion;
        } else {
            const n = parseInt(opcion, 10);
            if (!Number.isFinite(n) || n < 0 || n > 36) {
                return await sock.sendMessage(chatId, {
                    text: '⚠️ Uso: ,ruletacasino <rojo|negro|verde|0-36> <apuesta>\nEjemplo: ,ruletacasino rojo 100'
                });
            }
            tipo = 'numero';
            valor = n;
        }

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);

        const restante = eco.cooldownRestante(user, 'lastRuletaCasino');
        if (restante > 0) return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para jugar de nuevo.` });

        const apuesta = eco.parsearCantidad(args[1], user.coins);
        if (!apuesta) return await sock.sendMessage(chatId, { text: '⚠️ Pon una apuesta válida.' });
        if (user.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        eco.marcarCooldown(user, 'lastRuletaCasino');
        const resultado = eco.azar(0, 36);
        const color = colorDe(resultado);
        const emoji = color === 'rojo' ? '🔴' : color === 'negro' ? '⚫' : '🟢';

        let pago = 0;
        if (tipo === 'numero' && valor === resultado) {
            pago = apuesta * 36;
        } else if (tipo === 'color' && valor === color) {
            pago = color === 'verde' ? apuesta * 14 : apuesta * 2;
        }

        user.coins += pago > 0 ? pago : -apuesta;
        eco.guardar(data);

        const textoResultado = pago > 0
            ? `🎉 ¡Ganaste *${eco.formatear(pago)}* coins!`
            : `💸 Perdiste *${eco.formatear(apuesta)}* coins.`;
        const apuestaTexto = tipo === 'color' ? valor : `número ${valor}`;

        await sock.sendMessage(chatId, {
            text: `🎡 *RULETA*\n\n@${num} apostó a *${apuestaTexto}* con *${eco.formatear(apuesta)}* coins.\n\n🎯 Salió: ${emoji} *${resultado}* (${color})\n\n${textoResultado}\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
