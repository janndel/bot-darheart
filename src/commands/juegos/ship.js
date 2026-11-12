const { sendReaction } = require('../../lib/anime-media');
module.exports = {
    name: 'ship',
    alias: ['amor', 'love', 'shippear'],
    async execute(sock, msg, args, { chatId }) {
        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;

        // ✅ Caso 1: Dos usuarios mencionados
        if (mentioned && mentioned.length >= 2) {
            const user1 = mentioned[0];
            const user2 = mentioned[1];
            const num1 = user1.split('@')[0].split(':')[0];
            const num2 = user2.split('@')[0].split(':')[0];

            const porcentaje = calcularShip(num1, num2);
            const barra = generarBarra(porcentaje);
            const mensaje = mensajeAmor(porcentaje);

            await sendReaction(sock, chatId, msg, {
                type: 'sfw',
                action: 'love',
                caption: `💘 *SHIP*\n\n` +
                      `👤 @${num1}\n` +
                      `❤️ +\n` +
                      `👤 @${num2}\n\n` +
                      `${barra}\n` +
                      `💕 *${porcentaje}%* de amor\n\n` +
                      `${mensaje}`,
                mentions: [user1, user2]
            });
            return;
        }

        // ✅ Caso 2: Un usuario mencionado (ship contigo mismo)
        if (mentioned && mentioned.length === 1) {
            const user1 = mentioned[0];
            const num1 = user1.split('@')[0].split(':')[0];
            const sender = msg.key.participant || msg.key.remoteJid;
            const num2 = sender.split('@')[0].split(':')[0];

            if (num1 === num2) {
                return await sock.sendMessage(chatId, {
                    text: '⚠️ No puedes hacer ship contigo mismo. Menciona a alguien más.'
                });
            }

            const porcentaje = calcularShip(num1, num2);
            const barra = generarBarra(porcentaje);
            const mensaje = mensajeAmor(porcentaje);

            await sendReaction(sock, chatId, msg, {
                type: 'sfw',
                action: 'love',
                caption: `💘 *SHIP*\n\n` +
                      `👤 @${num1}\n` +
                      `❤️ +\n` +
                      `👤 @${num2}\n\n` +
                      `${barra}\n` +
                      `💕 *${porcentaje}%* de amor\n\n` +
                      `${mensaje}`,
                mentions: [user1, sender]
            });
            return;
        }

        // ✅ Caso 3: Sin menciones → ship aleatorio entre tú y el bot
        const sender = msg.key.participant || msg.key.remoteJid;
        const num1 = sender.split('@')[0].split(':')[0];
        const num2 = sock.user.id.split(':')[0].split('@')[0];

        const porcentaje = calcularShip(num1, num2);
        const barra = generarBarra(porcentaje);

        await sendReaction(sock, chatId, msg, {
            type: 'sfw',
            action: 'love',
            caption: `💘 *SHIP*\n\n` +
                  `👤 @${num1}\n` +
                  `❤️ +\n` +
                  `🤖 DARHEART\n\n` +
                  `${barra}\n` +
                  `💕 *${porcentaje}%* de amor\n\n` +
                  `_Menciona a 2 personas para ship entre ellas._`,
            mentions: [sender]
        });
    }
};

// ✅ Algoritmo determinista (mismo par = mismo resultado siempre)
function calcularShip(num1, num2) {
    const clave = [num1, num2].sort().join('-');
    let hash = 0;
    for (let i = 0; i < clave.length; i++) {
        hash = (hash * 31 + clave.charCodeAt(i)) % 1000000;
    }
    return (hash % 100) + 1; // 1-100
}

function generarBarra(porcentaje) {
    const bloques = Math.round(porcentaje / 5); // 0-20 bloques
    const llenos = '█'.repeat(bloques);
    const vacios = '░'.repeat(20 - bloques);
    return `[${llenos}${vacios}]`;
}

function mensajeAmor(p) {
    if (p >= 90) return '💍 ¡Boda ya! Son el uno para el otro.';
    if (p >= 75) return '💖 ¡Amor verdadero! Se ven muy bien juntos.';
    if (p >= 60) return '😍 Buena química, deberían intentarlo.';
    if (p >= 45) return '💕 Podrían funcionar con esfuerzo.';
    if (p >= 30) return '😅 Como amigos, tal vez.';
    if (p >= 15) return '😬 Mejor sigan siendo amigos.';
    return '💔 No hay química. Amigos y ya.';
}
