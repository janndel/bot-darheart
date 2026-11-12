const eco = require('../../lib/eco');

module.exports = {
    name: 'duelo',
    alias: ['retar', 'pelear'],
    category: 'economia',
    desc: 'Retar a alguien apostando coins',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const menciones = eco.mencionados(msg);
        if (menciones.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,duelo @user <apuesta>' });
        }

        const apuesta = eco.parsearCantidad(args[args.length - 1]);
        if (!apuesta) return await sock.sendMessage(chatId, { text: '⚠️ Pon una apuesta válida.' });

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = eco.limpiarJid(menciones[0]);
        const n1 = eco.numero(senderJid);
        const n2 = eco.numero(targetJid);

        if (n1 === n2) return await sock.sendMessage(chatId, { text: '⚠️ No puedes retarte a ti mismo.' });

        const data = eco.cargar();
        const u1 = eco.usuario(data, chatId, n1);
        const u2 = eco.usuario(data, chatId, n2);

        const restante = eco.cooldownRestante(u1, 'lastDuelo');
        if (restante > 0) return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para retar de nuevo.` });

        if (u1.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ @${n1} no tiene suficientes coins.`, mentions: [senderJid] });
        }
        if (u2.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ @${n2} no tiene suficientes coins.`, mentions: [targetJid] });
        }

        eco.marcarCooldown(u1, 'lastDuelo');
        const ganaU1 = eco.prob(50);
        if (ganaU1) {
            u1.coins += apuesta;
            u2.coins -= apuesta;
        } else {
            u2.coins += apuesta;
            u1.coins -= apuesta;
        }
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `⚔️ *DUELO*\n\n@${n1} vs @${n2}\n\n🏆 *Ganador:* @${ganaU1 ? n1 : n2}\n\n💰 Apuesta: *${eco.formatear(apuesta)}* coins\n\n💵 @${n1}: *${eco.formatear(u1.coins)}*\n💵 @${n2}: *${eco.formatear(u2.coins)}*`,
            mentions: [senderJid, targetJid]
        });
    }
};
