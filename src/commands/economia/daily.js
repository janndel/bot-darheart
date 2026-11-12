const eco = require('../../lib/eco');

module.exports = {
    name: 'daily',
    alias: ['diario', 'reclamar'],
    category: 'economia',
    desc: 'Recompensa diaria (5s)',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastDaily && ahora - user.lastDaily < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `⏳ Ya reclamaste hoy. Vuelve en *${eco.espera(cooldown - (ahora - user.lastDaily))}*.`
            });
        }

        const ganancia = eco.azar(100, 500);
        user.coins += ganancia;
        user.lastDaily = ahora;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🎁 *RECOMPENSA DIARIA*\n\n@${num} reclamó *${eco.formatear(ganancia)}* coins.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
