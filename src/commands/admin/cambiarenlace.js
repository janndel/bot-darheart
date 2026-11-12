module.exports = {
    name: 'cambiarenlace',
    alias: ['cambiarlink', 'nuevolink', 'revoke', 'restablecer'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        try {
            const metadata = await sock.groupMetadata(chatId);
            const soloNumero = (jid) => jid.split('@')[0].split(':')[0];
            const botNum = soloNumero(sock.user.id);
            const botLid = sock.user.lid ? soloNumero(sock.user.lid) : null;

            const buscar = (nums) => metadata.participants.find(p => {
                const pNum = soloNumero(p.id);
                const pLid = p.lid ? soloNumero(p.lid) : null;
                return nums.includes(pNum) || (pLid && nums.includes(pLid));
            });

            const botEnGrupo = buscar([botNum, botLid].filter(Boolean));
            if (!botEnGrupo?.admin) {
                return await sock.sendMessage(chatId, { text: '❌ Necesito ser admin del grupo.' });
            }

            // ✅ Revocar y generar nuevo código
            const nuevoCode = await sock.groupRevokeInvite(chatId);
            await sock.sendMessage(chatId, {
                text: `🔄 *Enlace regenerado*\n\n` +
                      `🔗 *Nuevo enlace:*\nhttps://chat.whatsapp.com/${nuevoCode}\n\n` +
                      `_El enlace anterior ya no funciona._`
            });
            console.log('✅ Enlace regenerado:', nuevoCode);
        } catch (error) {
            console.error('Error cambiarenlace:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
