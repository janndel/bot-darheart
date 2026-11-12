const eco = require('../../lib/eco');

const PRECIO = 1200;
const DURACION = 24 * 60 * 60 * 1000;

module.exports = {
    name: 'seguro',
    alias: ['proteccion', 'escudo'],
    category: 'economia',
    desc: 'Comprar seguro anti robos por 24h',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const accion = (args[0] || 'info').toLowerCase();
        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const activo = eco.seguroActivo(user);

        if (accion !== 'comprar') {
            const estado = activo
                ? `🛡️ Activo por *${eco.espera(user.seguroHasta - Date.now())}*`
                : '❌ Sin protección';
            return await sock.sendMessage(chatId, {
                text: `🛡️ *SEGURO*\n\n${estado}\n\n💵 Precio: *${eco.formatear(PRECIO)}* coins\n⏰ Duración: *24 horas*\n\n_Protege tu dinero de ,robar y ,hackear._\n\n_Usa:_ ,seguro comprar`,
                mentions: [senderJid]
            });
        }

        if (user.coins < PRECIO) {
            return await sock.sendMessage(chatId, {
                text: `❌ Necesitas *${eco.formatear(PRECIO)}* coins. Tienes *${eco.formatear(user.coins)}*.`
            });
        }

        user.coins -= PRECIO;
        const base = Math.max(Date.now(), Number(user.seguroHasta) || 0);
        user.seguroHasta = base + DURACION;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🛡️ *SEGURO ACTIVADO*\n\n@${num} está protegido por *${eco.espera(user.seguroHasta - Date.now())}*.\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
