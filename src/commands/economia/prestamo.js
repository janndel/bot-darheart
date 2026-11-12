const eco = require('../../lib/eco');

const MAXIMO = 1000;
const INTERES = 15;

module.exports = {
    name: 'prestamo',
    alias: ['loan', 'prestar'],
    category: 'economia',
    desc: 'Pedir un préstamo al banco (15% interés)',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        eco.aplicarMora(user);

        if (!args[0] || args[0].toLowerCase() === 'info') {
            if (user.prestamo) {
                eco.guardar(data);
                return await sock.sendMessage(chatId, {
                    text: `🏦 *PRÉSTAMO ACTIVO*\n\n👤 @${num}\n💳 Deuda: *${eco.formatear(user.prestamo.deuda)}* coins\n⏰ Vence en: *${eco.espera(user.prestamo.vence - Date.now())}*\n\n_Usa:_ ,pagar <cantidad|todo>`,
                    mentions: [senderJid]
                });
            }
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🏦 *PRÉSTAMO*\n\nPuedes pedir hasta *${eco.formatear(MAXIMO)}* coins.\n📈 Interés: *${INTERES}%*\n⏰ Plazo: *24 horas*\n\n_Usa:_ ,prestamo <cantidad>\n_Ejemplo:_ ,prestamo 500`,
                mentions: [senderJid]
            });
        }

        if (user.prestamo) {
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `⛔ Ya tienes una deuda de *${eco.formatear(user.prestamo.deuda)}* coins.\n\nPágala con ,pagar antes de pedir otro préstamo.`,
                mentions: [senderJid]
            });
        }

        const cantidad = eco.parsearCantidad(args[0], MAXIMO);
        if (!cantidad || cantidad < 100) {
            return await sock.sendMessage(chatId, { text: '⚠️ El préstamo mínimo es *100* coins y el máximo *1.000*.' });
        }
        if (cantidad > MAXIMO) {
            return await sock.sendMessage(chatId, { text: `⚠️ El préstamo máximo es *${eco.formatear(MAXIMO)}* coins.` });
        }

        const deuda = Math.ceil(cantidad * (1 + INTERES / 100));
        user.coins += cantidad;
        user.prestamo = {
            capital: cantidad,
            deuda,
            vence: Date.now() + 24 * 60 * 60 * 1000
        };
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🏦 *PRÉSTAMO APROBADO*\n\n@${num} recibió *${eco.formatear(cantidad)}* coins.\n\n💳 Deuda total: *${eco.formatear(deuda)}* coins\n⏰ Vence en: *24 horas*\n\n_Mora: +25% por cada día de retraso._`,
            mentions: [senderJid]
        });
    }
};
