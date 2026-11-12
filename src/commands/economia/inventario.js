const eco = require('../../lib/eco');

module.exports = {
    name: 'inventario',
    alias: ['mochila', 'items'],
    category: 'economia',
    desc: 'Ver tus items, banco y protecciones',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const menciones = eco.mencionados(msg);
        const target = menciones.length > 0
            ? eco.limpiarJid(menciones[0])
            : eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(target);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        eco.guardar(data);

        const conteo = {};
        for (const item of user.items || []) conteo[item] = (conteo[item] || 0) + 1;
        const items = Object.keys(conteo).length
            ? Object.entries(conteo).map(([item, n]) => `• ${item} x${n}`).join('\n')
            : '• _Vacío_';

        const lineas = [
            '🎒 *INVENTARIO*',
            '',
            `👤 @${num}`,
            `💵 En mano: *${eco.formatear(user.coins)}*`,
            `🏦 En banco: *${eco.formatear(user.banco || 0)}*`,
            '',
            '*ITEMS*',
            items
        ];
        if (eco.seguroActivo(user)) lineas.push(`\n🛡️ Seguro: *${eco.espera(user.seguroHasta - Date.now())}*`);
        if (Number(user.multiplicador) > 1) lineas.push(`✨ Multiplicador: *x${user.multiplicador}*`);
        if (user.prestamo) lineas.push(`📉 Deuda: *${eco.formatear(user.prestamo.deuda)}*`);
        if (user.empresa) lineas.push(`🏢 Empresa: *${user.empresa.nombre}* (nivel ${user.empresa.nivel})`);

        await sock.sendMessage(chatId, { text: lineas.join('\n'), mentions: [target] });
    }
};
