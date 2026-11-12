module.exports = {
    name: 'link',
    alias: ['enlace', 'invitacion'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        try {
            // ✅ Verificar admin
            const metadata = await sock.groupMetadata(chatId);
            const soloNumero = (jid) => jid.split('@')[0].split(':')[0];
            const botNum = soloNumero(sock.user.id);
            const botLid = sock.user.lid ? soloNumero(sock.user.lid) : null;

            const buscar = (numeros) => metadata.participants.find(p => {
                const pNum = soloNumero(p.id);
                const pLid = p.lid ? soloNumero(p.lid) : null;
                return numeros.includes(pNum) || (pLid && numeros.includes(pLid));
            });

            const botEnGrupo = buscar([botNum, botLid].filter(Boolean));
            if (!botEnGrupo?.admin) {
                return await sock.sendMessage(chatId, { 
                    text: '❌ No soy administrador de este grupo.' 
                });
            }

            // ✅ MÉTODO 1: groupInviteCode normal
            let code = null;
            try {
                code = await sock.groupInviteCode(chatId);
                console.log('✅ Método 1 exitoso (groupInviteCode)');
            } catch (e1) {
                console.log('❌ Método 1 falló:', e1.message);

                // ✅ MÉTODO 2: groupFetchAllParticipating
                try {
                    const todos = await sock.groupFetchAllParticipating();
                    const grupo = todos[chatId];
                    if (grupo && grupo.inviteCode) {
                        code = grupo.inviteCode;
                        console.log('✅ Método 2 exitoso (groupFetchAllParticipating)');
                    } else {
                        console.log('❌ Método 2 falló: sin inviteCode en metadata');
                    }
                } catch (e2) {
                    console.log('❌ Método 2 falló:', e2.message);

                    // ✅ MÉTODO 3: revokeInvite para regenerar
                    try {
                        code = await sock.groupRevokeInvite(chatId);
                        console.log('✅ Método 3 exitoso (revokeInvite - nuevo código generado)');
                    } catch (e3) {
                        console.log('❌ Método 3 falló:', e3.message);
                        throw new Error('Todos los métodos fallaron');
                    }
                }
            }

            if (!code) throw new Error('No se pudo generar el código');

            await sock.sendMessage(chatId, { 
                text: `🔗 *Enlace del grupo:*\n\nhttps://chat.whatsapp.com/${code}` 
            });
            console.log('✅ Link enviado');
        } catch (error) {
            console.error('Error link:', error.message);
            await sock.sendMessage(chatId, { 
                text: `❌ No pude generar el link.\n\n_Motivo: ${error.message}_\n\n` +
                      `💡 *Solución manual:*\n` +
                      `1. Abre la info del grupo\n` +
                      `2. Toca "Invitar por enlace"\n` +
                      `3. Copia el enlace manualmente` 
            });
        }
    }
};
