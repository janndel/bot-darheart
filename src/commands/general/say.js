module.exports = {
    name: 'say',
    alias: ['decir', 'repetir'],
    async execute(sock, msg, args, { chatId }) {
        if (args.length === 0) {
            return await sock.sendMessage(chatId, { text: '⚠️ Escribe lo que quieres que diga.\nEjemplo: ,say Hola mundo' });
        }

        const texto = args.join(' ');
        await sock.sendMessage(chatId, { text: texto });
    }
};
