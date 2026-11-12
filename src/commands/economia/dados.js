const eco = require('../../lib/eco');

module.exports = {
    name: 'dados',
    alias: ['dicear', 'dadosapuesta'],
    category: 'economia',
    desc: 'Apuesta a un número con dos dados',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const eleccion = parseInt(args[0], 10);
        if (!Number.isFinite(eleccion) || eleccion < 1 || eleccion > 6) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,dados <1-6> <apuesta>\nEjemplo: ,dados 4 100' });
        }

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);

        const restante = eco.cooldownRestante(user, 'lastDados');
        if (restante > 0) return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para jugar de nuevo.` });

        const apuesta = eco.parsearCantidad(args[1], user.coins);
        if (!apuesta) return await sock.sendMessage(chatId, { text: '⚠️ Pon una apuesta válida.' });
        if (user.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        eco.marcarCooldown(user, 'lastDados');
        const d1 = eco.azar(1, 6);
        const d2 = eco.azar(1, 6);
        const aciertos = (d1 === eleccion ? 1 : 0) + (d2 === eleccion ? 1 : 0);
        const pago = aciertos === 2 ? apuesta * 5 : aciertos === 1 ? apuesta * 2 : 0;

        user.coins += pago > 0 ? pago : -apuesta;
        eco.guardar(data);

        const emojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        const mensaje = aciertos === 2
            ? `🎉 ¡Doble acierto! Ganaste *${eco.formatear(pago)}* coins (x5).`
            : aciertos === 1
                ? `✅ Un acierto. Ganaste *${eco.formatear(pago)}* coins (x2).`
                : `💸 Ningún acierto. Perdiste *${eco.formatear(apuesta)}* coins.`;

        await sock.sendMessage(chatId, {
            text: `🎲 *DADOS*\n\n@${num} apostó al *${eleccion}*\n${emojis[d1 - 1]} *${d1}*  ${emojis[d2 - 1]} *${d2}*\n\n${mensaje}\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
