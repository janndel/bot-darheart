module.exports = {
    name: 'aprobartodo',
    alias: ['aceptartodo', 'approveall'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        try {
            // Obtener solicitudes pendientes
            const pendientes = await sock.groupRequestParticipantsList(chatId);

            if (!pendientes || pendientes.length === 0) {
                return await sock.sendMessage(chatId, {
                    text: '📭 No hay solicitudes pendientes.'
                });
            }

            const jids = pendientes.map(p => p.jid);
            await sock.groupRequestParticipantsUpdate(chatId, jids, 'approve');

            await sock.sendMessage(chatId, {
                text: `✅ *${jids.length} solicitud(es) aprobada(s).*`
            });
            console.log(`✅ Aprobadas ${jids.length} solicitudes`);
        } catch (error) {
            console.error('Error aprobartodo:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
