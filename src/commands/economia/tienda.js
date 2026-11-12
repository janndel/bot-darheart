const eco = require('../../lib/eco');

const ITEMS = {
    vip: { precio: 5000, desc: 'Rol VIP' },
    corona: { precio: 3000, desc: 'Corona de millonario' },
    diamante: { precio: 10000, desc: 'Item legendario' },
    escudo: { precio: 2000, desc: 'Seguro anti robos por 24h' },
    multiplicador: { precio: 8000, desc: 'Duplica tu próxima ganancia de work' }
};

module.exports = {
    name: 'tienda',
    alias: ['shop', 'comprar', 'buy', 'inventory', 'inv', 'inventario'],
    category: 'economia',
    desc: 'Comprar items con coins',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const accion = (args[0] || '').toLowerCase();

        if (!accion) {
            const lineas = ['🛒 *TIENDA*', ''];
            for (const [id, info] of Object.entries(ITEMS)) {
                lineas.push(`➺ *${id}* — ${eco.formatear(info.precio)} coins`);
                lineas.push(`   _${info.desc}_`);
            }
            lineas.push('');
            lineas.push('_Usa:_ ,tienda comprar <item>');
            return await sock.sendMessage(chatId, { text: lineas.join('\n') });
        }

        if (accion !== 'comprar') {
            return await sock.sendMessage(chatId, { text: '⚠️ Usa: ,tienda o ,tienda comprar <item>' });
        }

        const itemId = (args[1] || '').toLowerCase();
        const item = ITEMS[itemId];
        if (!item) return await sock.sendMessage(chatId, { text: '❌ Ese item no existe.' });

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        if (!user.items) user.items = [];

        if (user.coins < item.precio) {
            return await sock.sendMessage(chatId, {
                text: `❌ Necesitas *${eco.formatear(item.precio)}* coins. Tienes *${eco.formatear(user.coins)}*.`
            });
        }

        user.coins -= item.precio;

        if (itemId === 'escudo') {
            const base = Math.max(Date.now(), Number(user.seguroHasta) || 0);
            user.seguroHasta = base + 24 * 60 * 60 * 1000;
        } else if (itemId === 'multiplicador') {
            user.multiplicador = Math.min(4, (Number(user.multiplicador) || 1) * 2);
        } else {
            user.items.push(itemId);
        }

        eco.guardar(data);

        const extra = itemId === 'escudo'
            ? `\n🛡️ Seguro activo por *${eco.espera(user.seguroHasta - Date.now())}*.`
            : itemId === 'multiplicador'
                ? `\n✨ Multiplicador x${user.multiplicador} listo para tu próximo ,work.`
                : '';

        await sock.sendMessage(chatId, {
            text: `🎁 *COMPRA EXITOSA*\n\n@${num} compró *${itemId}*.${extra}\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
