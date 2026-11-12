const eco = require('../../lib/eco');

module.exports = {
    name: 'loteria',
    alias: ['lotto', 'loto'],
    category: 'economia',
    desc: 'Elige un número del 1 al 100 y apuesta',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const numero = parseInt(args[0], 10);
        if (!Number.isFinite(numero) || numero < 1 || numero > 100) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,loteria <1-100> <apuesta>\nEjemplo: ,loteria 47 100' });
        }

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);

        const restante = eco.cooldownRestante(user, 'lastLoteria');
        if (restante > 0) return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para jugar de nuevo.` });

        const apuesta = eco.parsearCantidad(args[1], user.coins);
        if (!apuesta) return await sock.sendMessage(chatId, { text: '⚠️ Pon una apuesta válida.' });
        if (user.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        eco.marcarCooldown(user, 'lastLoteria');
        const sorteo = eco.azar(1, 100);
        const diferencia = Math.abs(sorteo - numero);

        let premio = 0;
        let mensaje = '';
        if (sorteo === numero) {
            premio = apuesta * 50;
            mensaje = `🎉 ¡NÚMERO EXACTO! Ganaste *${eco.formatear(premio)}* coins.`;
        } else if (diferencia <= 3) {
            premio = apuesta;
            mensaje = `😮 ¡Casi! Te quedaste a ${diferencia} número(s). Recuperas tu apuesta.`;
        } else {
            mensaje = `💸 No hubo suerte. Perdiste *${eco.formatear(apuesta)}* coins.`;
        }

        user.coins += premio > 0 ? premio : -apuesta;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🎟️ *LOTERÍA*\n\n@${num} eligió el *${numero}*\n🎯 Salió el *${sorteo}*\n\n${mensaje}\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
