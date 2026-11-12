const eco = require('../../lib/eco');

module.exports = {
    name: 'banco',
    alias: ['depositar', 'atm', 'dep', 'deposit', 'd'],
    category: 'economia',
    desc: 'Guardar o sacar coins del banco',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const accion = (args[0] || '').toLowerCase();
        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        if (user.banco === undefined) user.banco = 0;

        if (!accion) {
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🏦 *BANCO*\n\n💵 En mano: *${eco.formatear(user.coins)}*\n🏛️ En banco: *${eco.formatear(user.banco)}*\n💎 Total: *${eco.formatear(user.coins + user.banco)}*\n\n_Usa:_ ,banco depositar <cantidad|todo>\n_Usa:_ ,banco sacar <cantidad|todo>`,
                mentions: [senderJid]
            });
        }

        if (accion === 'depositar' || accion === 'dep') {
            const cantidad = eco.parsearCantidad(args[1], user.coins);
            if (!cantidad) return await sock.sendMessage(chatId, { text: '⚠️ Pon una cantidad válida.' });
            if (user.coins < cantidad) return await sock.sendMessage(chatId, { text: '❌ No tienes suficiente en mano.' });
            user.coins -= cantidad;
            user.banco += cantidad;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `✅ Depositados *${eco.formatear(cantidad)}* coins.\n\n🏛️ Banco: *${eco.formatear(user.banco)}*`,
                mentions: [senderJid]
            });
        }

        if (accion === 'sacar' || accion === 'retirar') {
            const cantidad = eco.parsearCantidad(args[1], user.banco);
            if (!cantidad) return await sock.sendMessage(chatId, { text: '⚠️ Pon una cantidad válida.' });
            if (user.banco < cantidad) return await sock.sendMessage(chatId, { text: '❌ No tienes suficiente en el banco.' });
            user.banco -= cantidad;
            user.coins += cantidad;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `✅ Sacaste *${eco.formatear(cantidad)}* coins.\n\n💵 En mano: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        await sock.sendMessage(chatId, { text: '⚠️ Acción no válida. Usa: depositar o sacar.' });
    }
};
