const eco = require('../../lib/eco');
const { formatearMencion } = require('../../lib/grupo');

module.exports = {
    name: 'rankcoins',
    alias: ['toprico', 'millonarios', 'rankingcoins'],
    category: 'economia',
    desc: 'Top 10 con más coins',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const data = eco.cargar();
        const grupo = data[chatId] || {};
        const ranking = Object.entries(grupo)
            .map(([num, info]) => [num, Number(info.coins) || 0])
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        if (ranking.length === 0) {
            return await sock.sendMessage(chatId, { text: '📊 Aún no hay millonarios. Usen ,work para empezar.' });
        }

        const medallas = ['🥇', '🥈', '🥉'];
        const lista = ranking.map(([num, coins], i) => {
            const medalla = medallas[i] || `#${i + 1}`;
            return `${medalla} @${num} — *${eco.formatear(coins)}* coins`;
        }).join('\n');

        await sock.sendMessage(chatId, {
            text: `🏆 *TOP MILLONARIOS*\n\n${lista}`,
            mentions: ranking.map(([num]) => formatearMencion(num))
        });
    }
};
