const eco = require('../../lib/eco');

module.exports = {
    name: 'regalar',
    alias: ['transferir', 'dar'],
    category: 'economia',
    desc: 'Transferir coins a otro usuario',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const menciones = eco.mencionados(msg);
        if (menciones.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,regalar @usuario <cantidad>' });
        }

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const targetJid = eco.limpiarJid(menciones[0]);
        const numSender = eco.numero(senderJid);
        const numTarget = eco.numero(targetJid);

        if (numSender === numTarget) {
            return await sock.sendMessage(chatId, { text: '⚠️ No puedes regalarte a ti mismo.' });
        }

        const data = eco.cargar();
        const origen = eco.usuario(data, chatId, numSender);
        const destino = eco.usuario(data, chatId, numTarget);

        const cantidad = eco.parsearCantidad(args[args.length - 1], origen.coins);
        if (!cantidad) {
            return await sock.sendMessage(chatId, { text: '⚠️ Pon una cantidad válida.\nEjemplo: ,regalar @user 500' });
        }
        if (origen.coins < cantidad) {
            return await sock.sendMessage(chatId, { text: `❌ No tienes suficiente. Tienes *${eco.formatear(origen.coins)}* coins.` });
        }

        origen.coins -= cantidad;
        destino.coins += cantidad;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🎁 *TRANSFERENCIA*\n\n@${numSender} le regaló *${eco.formatear(cantidad)}* coins a @${numTarget}.\n\n💰 Nuevo balance:\n@${numSender}: *${eco.formatear(origen.coins)}*\n@${numTarget}: *${eco.formatear(destino.coins)}*`,
            mentions: [senderJid, targetJid]
        });
    }
};
