const eco = require('../../lib/eco');

module.exports = {
    name: 'ruletarusa',
    alias: ['rusa', 'apuesta'],
    category: 'economia',
    desc: 'Apuesta 50/50: duplica o pierde',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);

        const restante = eco.cooldownRestante(user, 'lastRuletaRusa');
        if (restante > 0) return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para jugar de nuevo.` });

        const apuesta = eco.parsearCantidad(args[0], user.coins);
        if (!apuesta) return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,ruletarusa <apuesta|todo>' });
        if (user.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        eco.marcarCooldown(user, 'lastRuletaRusa');
        const gana = eco.prob(50);
        user.coins += gana ? apuesta : -apuesta;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🎲 *RULETA RUSA*\n\n${gana ? `✅ ¡Ganaste *${eco.formatear(apuesta)}* coins!` : `💥 Perdiste *${eco.formatear(apuesta)}* coins.`}\n\n📊 Balance: *${eco.formatear(user.coins)}* coins`,
            mentions: [senderJid]
        });
    }
};
