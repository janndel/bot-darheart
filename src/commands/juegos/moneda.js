module.exports = {
    name: 'moneda',
    alias: ['coin', 'caraocruz', 'flip'],
    async execute(sock, msg, args, { chatId }) {
        const resultado = Math.random() < 0.5 ? 'CARA 🪙' : 'CRUZ 🪙';
        await sock.sendMessage(chatId, {
            text: `🪙 *Lanzando moneda...*\n\n✨ Salió: *${resultado}*`
        });
    }
};
