const eco = require('../../lib/eco');

module.exports = {
    name: 'invertir',
    alias: ['inversion', 'bolsa'],
    category: 'economia',
    desc: 'Invertir coins con riesgo (5s)',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastInvertir && ahora - user.lastInvertir < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `📊 El mercado está cerrado para ti. Vuelve en *${eco.espera(cooldown - (ahora - user.lastInvertir))}*.`
            });
        }

        const monto = eco.parsearCantidad(args[0], user.coins);
        if (!monto) return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,invertir <cantidad|todo> (mínimo 100)' });
        if (monto < 100) return await sock.sendMessage(chatId, { text: '⚠️ La inversión mínima es *100* coins.' });
        if (user.coins < monto) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        user.lastInvertir = ahora;
        user.coins -= monto;

        const tirada = Math.random();
        let retorno = 0;
        let etiqueta = '';

        if (tirada < 0.10) {
            retorno = 0;
            etiqueta = '💥 El mercado colapsó. Pérdida total.';
        } else if (tirada < 0.35) {
            retorno = Math.floor(monto * 0.5);
            etiqueta = '📉 Perdiste el 50% de la inversión.';
        } else if (tirada < 0.65) {
            const ganancia = eco.azar(10, 40);
            retorno = monto + Math.floor(monto * ganancia / 100);
            etiqueta = `📈 Ganancia del ${ganancia}%.`;
        } else if (tirada < 0.90) {
            const ganancia = eco.azar(50, 100);
            retorno = monto + Math.floor(monto * ganancia / 100);
            etiqueta = `🚀 Ganancia del ${ganancia}%.`;
        } else {
            const multiplicador = eco.azar(2, 3);
            retorno = monto * multiplicador;
            etiqueta = `🌕 ¡Multiplicaste tu inversión x${multiplicador}!`;
        }

        user.coins += retorno;
        eco.guardar(data);

        const diferencia = retorno - monto;
        const balance = diferencia >= 0
            ? `📊 Ganancia neta: *+${eco.formatear(diferencia)}* coins`
            : `📊 Pérdida neta: *-${eco.formatear(Math.abs(diferencia))}* coins`;

        await sock.sendMessage(chatId, {
            text: `💹 *INVERSIÓN*\n\n@${num} invirtió *${eco.formatear(monto)}* coins.\n\n${etiqueta}\n${balance}\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
