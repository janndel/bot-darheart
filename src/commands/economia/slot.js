const eco = require('../../lib/eco');

const SIMBOLOS = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣'];

module.exports = {
    name: 'slot',
    alias: ['tragaperras', 'casino', 'apostar'],
    category: 'economia',
    desc: 'Máquina tragamonedas',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);

        const restante = eco.cooldownRestante(user, 'lastSlot');
        if (restante > 0) return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para jugar de nuevo.` });

        const apuesta = eco.parsearCantidad(args[0], user.coins);
        if (!apuesta) return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,slot <apuesta|todo>\nEjemplo: ,slot 100' });
        if (user.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        eco.marcarCooldown(user, 'lastSlot');
        const r1 = eco.elegir(SIMBOLOS);
        const r2 = eco.elegir(SIMBOLOS);
        const r3 = eco.elegir(SIMBOLOS);

        let ganancia = 0;
        let resultado = '';
        if (r1 === r2 && r2 === r3) {
            if (r1 === '7️⃣') {
                ganancia = apuesta * 10;
                resultado = '🎉 ¡JACKPOT x10!';
            } else if (r1 === '💎') {
                ganancia = apuesta * 5;
                resultado = '💎 ¡Diamantes x5!';
            } else {
                ganancia = apuesta * 3;
                resultado = '🎊 ¡Tres iguales x3!';
            }
        } else if (r1 === r2 || r2 === r3 || r1 === r3) {
            ganancia = Math.floor(apuesta * 1.5);
            resultado = '✅ Dos iguales (x1.5)';
        } else {
            ganancia = -apuesta;
            resultado = '❌ Perdiste';
        }

        user.coins = Math.max(0, user.coins + ganancia);
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🎰 *TRAGAPERRAS*\n\n[ ${r1} | ${r2} | ${r3} ]\n\n${resultado}\n\n💰 Apuesta: *${eco.formatear(apuesta)}*\n📊 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
