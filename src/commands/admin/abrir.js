module.exports = {
    name: 'abrir',
    alias: ['open'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        try {
            await sock.groupSettingUpdate(chatId, 'not_announcement');
            await sock.sendMessage(chatId, { 
                text: '🔓 *Grupo abierto.* Todos los miembros pueden enviar mensajes.' 
            });
        } catch (error) {
            console.error('Error abrir:', error.message);
            await sock.sendMessage(chatId, { text: '❌ No pude abrir el grupo. ¿Soy admin?' });
        }
    }
};
