const eco = require('../../lib/eco');

const PALOS = ['♠️', '♥️', '♦️', '♣️'];
const VALORES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function nuevaCarta() {
    const valor = eco.elegir(VALORES);
    return { texto: `${valor}${eco.elegir(PALOS)}`, valor };
}

function valorMano(mano) {
    let total = 0;
    let ases = 0;
    for (const carta of mano) {
        if (carta.valor === 'A') {
            total += 11;
            ases++;
        } else if (['J', 'Q', 'K'].includes(carta.valor)) {
            total += 10;
        } else {
            total += Number(carta.valor);
        }
    }
    while (total > 21 && ases > 0) {
        total -= 10;
        ases--;
    }
    return total;
}

function textoMano(mano) {
    return mano.map(c => c.texto).join(' ');
}

module.exports = {
    name: 'blackjack',
    alias: ['bj', '21'],
    category: 'economia',
    desc: 'Juega blackjack apostando coins',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);

        const restante = eco.cooldownRestante(user, 'lastBlackjack');
        if (restante > 0) return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para jugar de nuevo.` });

        const apuesta = eco.parsearCantidad(args[0], user.coins);
        if (!apuesta) return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,blackjack <apuesta|todo>\nMínimo: 50 coins.' });
        if (apuesta < 50) return await sock.sendMessage(chatId, { text: '⚠️ La apuesta mínima es *50* coins.' });
        if (user.coins < apuesta) {
            return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
        }

        eco.marcarCooldown(user, 'lastBlackjack');
        user.coins -= apuesta;

        const jugador = [nuevaCarta(), nuevaCarta()];
        const dealer = [nuevaCarta(), nuevaCarta()];
        let totalJ = valorMano(jugador);
        let totalD = valorMano(dealer);
        const blackjackJ = jugador.length === 2 && totalJ === 21;
        const blackjackD = dealer.length === 2 && totalD === 21;

        let resultado = '';
        if (blackjackJ || blackjackD) {
            if (blackjackJ && blackjackD) {
                user.coins += apuesta;
                resultado = '🤝 Doble blackjack. Empate, recuperas tu apuesta.';
            } else if (blackjackJ) {
                user.coins += Math.floor(apuesta * 2.5);
                resultado = '🃏 ¡BLACKJACK! Cobras x2.5.';
            } else {
                resultado = '💥 El dealer sacó blackjack. Pierdes.';
            }
        } else {
            while (totalJ < 17) {
                jugador.push(nuevaCarta());
                totalJ = valorMano(jugador);
            }
            if (totalJ > 21) {
                resultado = '💥 Te pasaste de 21. Pierdes.';
            } else {
                while (totalD < 17) {
                    dealer.push(nuevaCarta());
                    totalD = valorMano(dealer);
                }
                if (totalD > 21 || totalJ > totalD) {
                    user.coins += apuesta * 2;
                    resultado = '🏆 ¡Ganaste! Cobras x2.';
                } else if (totalJ === totalD) {
                    user.coins += apuesta;
                    resultado = '🤝 Empate. Recuperas tu apuesta.';
                } else {
                    resultado = '💥 El dealer gana. Pierdes.';
                }
            }
        }

        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🃏 *BLACKJACK*\n\n👤 @${num}: ${textoMano(jugador)}\n📊 Total: *${totalJ}*\n\n🤖 Dealer: ${textoMano(dealer)}\n📊 Total: *${totalD}*\n\n${resultado}\n\n💰 Apuesta: *${eco.formatear(apuesta)}*\n💵 Balance: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
