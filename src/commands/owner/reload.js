const {
    esOwner
} = require('../../lib/permissions');

module.exports = {
    name: 'reload',
    alias: ['recargar', 'recarga'],
    category: 'owner',
    desc: 'Recarga todos los comandos desde los archivos',
    async execute(sock, msg, args, { chatId }) {
        if (!esOwner(sock, msg)) {
            return await sock.sendMessage(chatId, {
                text: '🔒 Solo el owner del bot puede usar esta función.'
            });
        }

        try {
            global.recargarComandos();
            await sock.sendMessage(chatId, {
                text: '✅ *COMANDOS RECARGADOS*\n\nSe han recargado todos los comandos desde los archivos.\n💡 Usa ,menu para ver la actualización.'
            });
        } catch (error) {
            console.error('Error recargando comandos:', error.message);
            await sock.sendMessage(chatId, {
                text: `❌ Error al recargar comandos: ${error.message}`
            });
        }
    }
};