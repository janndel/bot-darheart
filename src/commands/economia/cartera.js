const eco = require('../../lib/eco');

module.exports = {
    name: 'cartera',
    alias: ['wallet', 'dinero', 'balance', 'bal', 'coins', 'bank'],
    category: 'economia',
    desc: 'Ver dinero, banco, deuda y seguro',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const menciones = eco.mencionados(msg);
        const target = menciones.length > 0
            ? eco.limpiarJid(menciones[0])
            : eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(target);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        eco.aplicarMora(user);
        eco.guardar(data);

        const lineas = [
            '💰 *CARTERA*',
            '',
            `👤 @${num}`,
            `💵 En mano: *${eco.formatear(user.coins)}* DARHEART coins`,
            `🏦 En banco: *${eco.formatear(user.banco || 0)}*`
        ];
        if (user.prestamo) {
            lineas.push(`📉 Deuda: *${eco.formatear(user.prestamo.deuda)}* coins`);
            lineas.push(`⏰ Vence en: *${eco.espera(user.prestamo.vence - Date.now())}*`);
        }
        if (eco.seguroActivo(user)) {
            lineas.push(`🛡️ Seguro activo: *${eco.espera(user.seguroHasta - Date.now())}*`);
        }
        if (user.items?.length) {
            lineas.push(`🎒 Items: *${user.items.length}* (${user.items.slice(0, 5).join(', ')})`);
        }

        await sock.sendMessage(chatId, { text: lineas.join('\n'), mentions: [target] });
    }
};
