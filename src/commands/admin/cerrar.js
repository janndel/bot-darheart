module.exports = {
    name: 'cerrar',
    alias: ['close'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        try {
            await sock.groupSettingUpdate(chatId, 'announcement');
            await sock.sendMessage(chatId, { 
                text: '🔒 *Grupo cerrado.* Solo los administradores pueden enviar mensajes.' 
            });
        } catch (error) {
            console.error('Error cerrar:', error.message);
            await sock.sendMessage(chatId, { text: '❌ No pude cerrar el grupo. ¿Soy admin?' });
        }
    }
};
