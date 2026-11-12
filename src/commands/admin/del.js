module.exports = {
    name: 'del',
    alias: ['borrar', 'delete'],
    async execute(sock, msg, args, { chatId }) {
        const quoted = msg.message.extendedTextMessage?.contextInfo;
        
        if (!quoted || !quoted.stanzaId) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Responde a un mensaje con ,del para eliminarlo.' 
            });
        }

        // ✅ Diagnóstico: ver qué datos tiene el mensaje citado
        console.log('🔍 del - Datos del mensaje citado:', {
            stanzaId: quoted.stanzaId,
            participant: quoted.participant,
            remoteJid: quoted.remoteJid,
            fromMe: quoted.fromMe
        });

        // ✅ Detectar si el mensaje citado es del bot o de otro
        const botNum = sock.user.id.split('@')[0].split(':')[0];
        const botLid = sock.user.lid ? sock.user.lid.split('@')[0].split(':')[0] : null;
        
        const participantNum = quoted.participant 
            ? quoted.participant.split('@')[0].split(':')[0] 
            : null;

        // ¿El mensaje citado es del bot? (por número o por LID)
        const esDelBot = quoted.fromMe === true || 
                         participantNum === botNum || 
                         (botLid && participantNum === botLid) ||
                         !quoted.participant; // Si no hay participant, suele ser un mensaje del bot

        console.log(`🔍 Es del bot: ${esDelBot}`);

        try {
            if (esDelBot) {
                // ✅ Borrar mensaje propio del bot
                await sock.sendMessage(chatId, {
                    delete: {
                        remoteJid: chatId,
                        fromMe: true,
                        id: quoted.stanzaId
                    }
                });
                console.log('✅ Mensaje del bot borrado');
            } else {
                // ✅ Borrar mensaje de otro usuario (solo funciona si eres admin)
                await sock.sendMessage(chatId, {
                    delete: {
                        remoteJid: chatId,
                        fromMe: false,
                        id: quoted.stanzaId,
                        participant: quoted.participant
                    }
                });
                console.log('✅ Mensaje de otro usuario borrado');
            }
        } catch (error) {
            console.error('❌ Error del:', error.message);
            await sock.sendMessage(chatId, { 
                text: `❌ No pude borrar el mensaje.\n\n` +
                      `_Motivo: ${error.message}_\n\n` +
                      `⚠️ Nota: Solo puedes borrar mensajes de OTROS si el bot es admin del grupo y el mensaje tiene menos de 2 días.` 
            });
        }
    }
};
