const eco = require('../../lib/eco');

module.exports = {
    name: 'coinflip',
    alias: ['caracruz', 'volado', 'cf', 'flip'],
    category: 'economia',
    desc: 'Apuesta a cara o cruz',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const eleccion = (args[0] || '').toLowerCase();
        if (!['cara', 'cruz'].includes(eleccion)) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,coinflip <cara|cruz> <apuesta>\nEjemplo: ,coinflip cara 100' });
        }

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);

        const restante = eco.cooldownRestante(user, 'lastCoinflip');
        if (restante > 0) return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para jugar de nuevo.` });

        const apuesta = eco.parsearCantidad(args[1], user.coins);
        if (!apuesta) return await sock.sendMessage(chatId, { text: '⚠️ Pon una apuesta válida.' });
        if (user.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        eco.marcarCooldown(user, 'lastCoinflip');
        const resultado = eco.prob(50) ? 'cara' : 'cruz';
        const gano = resultado === eleccion;
        user.coins += gano ? apuesta : -apuesta;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🪙 *COINFLIP*\n\n@${num} eligió *${eleccion}*.\nLa moneda cayó en *${resultado}* ${resultado === 'cara' ? '🌕' : '🌑'}\n\n${gano ? `🎉 ¡Ganaste *${eco.formatear(apuesta)}* coins!` : `💸 Perdiste *${eco.formatear(apuesta)}* coins.`}\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
