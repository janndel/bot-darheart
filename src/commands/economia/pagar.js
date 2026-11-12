const eco = require('../../lib/eco');

module.exports = {
    name: 'pagar',
    alias: ['pagardeuda', 'deuda'],
    category: 'economia',
    desc: 'Pagar tu préstamo pendiente',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const moras = eco.aplicarMora(user);

        if (!user.prestamo) {
            eco.guardar(data);
            return await sock.sendMessage(chatId, { text: '✅ No tienes deudas pendientes.' });
        }

        const deuda = user.prestamo.deuda;
        if (!args[0]) {
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `💳 *DEUDA*\n\n@${num}\n📉 Debe: *${eco.formatear(deuda)}* coins\n⏰ Vence en: *${eco.espera(user.prestamo.vence - Date.now())}*\n💵 Tienes: *${eco.formatear(user.coins)}*${moras ? `\n\n⚠️ Se aplicó mora por ${moras} día(s).` : ''}\n\n_Usa:_ ,pagar <cantidad|todo>`,
                mentions: [senderJid]
            });
        }

        if (user.coins <= 0) {
            return await sock.sendMessage(chatId, { text: '❌ No tienes coins para pagar.' });
        }

        let cantidad = eco.parsearCantidad(args[0], Math.min(deuda, user.coins));
        if (!cantidad) return await sock.sendMessage(chatId, { text: '⚠️ Pon una cantidad válida.' });
        if (cantidad > user.coins) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        cantidad = Math.min(cantidad, deuda);
        user.coins -= cantidad;
        user.prestamo.deuda -= cantidad;

        let mensaje;
        if (user.prestamo.deuda <= 0) {
            delete user.prestamo;
            mensaje = `✅ ¡Deuda pagada por completo! Pagaste *${eco.formatear(cantidad)}* coins.\n\n💰 Balance: *${eco.formatear(user.coins)}*`;
        } else {
            mensaje = `💳 Pagaste *${eco.formatear(cantidad)}* coins.\n\n📉 Deuda restante: *${eco.formatear(user.prestamo.deuda)}*\n💰 Balance: *${eco.formatear(user.coins)}*`;
        }

        if (moras) mensaje += `\n\n⚠️ Se aplicó mora por ${moras} día(s) de retraso.`;

        eco.guardar(data);
        await sock.sendMessage(chatId, { text: `🏦 *PAGO*\n\n@${num} ${mensaje}`, mentions: [senderJid] });
    }
};
