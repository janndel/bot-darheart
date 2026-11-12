module.exports = {
    name: 'test',
    alias: ['testbot', 'velocidad'],
    async execute(sock, msg, args, { chatId, config }) {
        const inicio = Date.now();
        const enviado = await sock.sendMessage(chatId, { text: '⚙️ Midiendo...' });
        const latencia = Date.now() - inicio;

        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const m = Math.floor((uptime % 3600) / 60);

        const memUsada = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const memTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);

        let calidad, emoji;
        if (latencia < 200) { calidad = 'Excelente'; emoji = '🟢'; }
        else if (latencia < 500) { calidad = 'Buena'; emoji = '🟡'; }
        else if (latencia < 1000) { calidad = 'Regular'; emoji = '🟠'; }
        else { calidad = 'Lenta'; emoji = '🔴'; }

        await sock.sendMessage(chatId, {
            text: `⚙️ *TEST DEL BOT*\n\n` +
                  `⚡ *Latencia:* ${latencia} ms\n` +
                  `${emoji} *Calidad:* ${calidad}\n\n` +
                  `⏱️ *Uptime:* ${h}h ${m}m\n` +
                  `💾 *RAM:* ${memUsada} MB / ${memTotal} MB\n` +
                  `🖥️ *Node:* ${process.version}\n` +
                  `🌍 *Plataforma:* ${process.platform}`
        });
    }
};
