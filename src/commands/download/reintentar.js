const dl = require('./dl');

module.exports = {
    name: 'reintentar',
    alias: ['retry', 'reintentar'],
    category: 'descargas',
    desc: 'Reintenta la última descarga fallida',
    oculto: true,
    ownerOnly: true,
    timeout: 1800000,
    async execute(sock, msg, args, { chatId }) {
        const resultado = await dl.reintentar(sock, chatId);
        if (!resultado) {
            await sock.sendMessage(chatId, {
                text: 'ℹ️ No hay descargas fallidas para reintentar.'
            });
        }
    }
};
