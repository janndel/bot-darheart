module.exports = {
    name: 'sorteo',
    alias: ['rifa', 'elegir'],
    async execute(sock, msg, args, { chatId }) {
        // Uso: ,sorteo opción1 | opción2 | opción3
        if (args.length === 0) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ *Uso:*\n,sorteo opción1 | opción2 | opción3\n\n_Ejemplo:_ ,sorteo pizza | sushi | tacos'
            });
        }

        const texto = args.join(' ');
        const opciones = texto.split('|').map(o => o.trim()).filter(o => o);

        if (opciones.length < 2) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Necesitas al menos 2 opciones separadas por *|*'
            });
        }

        const elegido = opciones[Math.floor(Math.random() * opciones.length)];

        await sock.sendMessage(chatId, {
            text: `🎲 *SORTEO*\n\n` +
                  `📋 Opciones:\n${opciones.map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\n` +
                  `🏆 *Ganador:* ${elegido}`
        });
    }
};
