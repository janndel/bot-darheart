module.exports = {
    name: 'dado',
    alias: ['dice', 'dadito'],
    async execute(sock, msg, args, { chatId }) {
        const numero = Math.floor(Math.random() * 6) + 1;
        const emojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        await sock.sendMessage(chatId, {
            text: `🎲 *Lanzando dado...*\n\n${emojis[numero - 1]}  *${numero}*`
        });
    }
};
