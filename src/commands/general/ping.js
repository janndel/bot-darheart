module.exports = {
    name: 'ping',
    alias: ['p', 'pingpong', 'speed'],
    async execute(sock, msg, args, { chatId }) {
        const inicio = Date.now();
        await sock.sendMessage(chatId, { text: '🏓 Pong!' });
        const latencia = Date.now() - inicio;

        let calidad, emoji;
        if (latencia < 200) { calidad = 'Excelente'; emoji = '🟢'; }
        else if (latencia < 500) { calidad = 'Buena'; emoji = '🟡'; }
        else if (latencia < 1000) { calidad = 'Regular'; emoji = '🟠'; }
        else { calidad = 'Lenta'; emoji = '🔴'; }

        await sock.sendMessage(chatId, {
            text: `🏓 *Pong!*\n\n` +
                  `⚡ *Latencia:* ${latencia} ms\n` +
                  `${emoji} *Calidad:* ${calidad}\n` +
                  `🕐 *Hora:* ${new Date().toLocaleTimeString('es-VE')}`
        });
    }
};
