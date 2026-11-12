module.exports = {
    name: 'debug',
    alias: ['diag', 'check'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        try {
            const metadata = await sock.groupMetadata(chatId);
            const soloNumero = (jid) => jid.split('@')[0].split(':')[0];
            const botNum = soloNumero(sock.user.id);
            const botLid = sock.user.lid ? soloNumero(sock.user.lid) : null;

            console.log('🔍 DIAGNÓSTICO:');
            console.log('   Bot ID:', sock.user.id);
            console.log('   Bot LID:', sock.user.lid || 'sin LID');
            console.log('   Bot número:', botNum);
            console.log('   Participantes del grupo:');

            let miInfo = null;
            metadata.participants.forEach(p => {
                const pNum = soloNumero(p.id);
                const pLid = p.lid ? soloNumero(p.lid) : null;
                const esBot = pNum === botNum || pLid === botNum || pNum === botLid || pLid === botLid;
                console.log(`      - ${p.id} | lid: ${p.lid || 'N/A'} | admin: ${p.admin || 'no'} ${esBot ? '⬅️ SOY YO' : ''}`);
                if (esBot) miInfo = p;
            });

            console.log(`   ¿Me encontré? ${miInfo ? 'SÍ' : 'NO'}`);
            console.log(`   ¿Soy admin? ${miInfo?.admin ? 'SÍ: ' + miInfo.admin : 'NO'}`);

            // Probar si puedo obtener el código de invitación
            let puedeLink = '❌ No';
            try {
                const code = await sock.groupInviteCode(chatId);
                puedeLink = `✅ Sí: ${code.slice(0, 8)}...`;
            } catch (e) {
                puedeLink = `❌ Error: ${e.message}`;
            }

            await sock.sendMessage(chatId, {
                text: `🔍 *DIAGNÓSTICO DEL BOT*\n\n` +
                      `🆔 Mi ID: ${sock.user.id.split(':')[0]}\n` +
                      `📱 Mi LID: ${sock.user.lid || 'sin LID'}\n` +
                      `👑 ¿Soy admin?: ${miInfo?.admin ? 'SÍ (' + miInfo.admin + ')' : 'NO'}\n` +
                      `🔗 ¿Puedo generar link?: ${puedeLink}\n\n` +
                      `_Revisa la terminal para más detalles._`
            });
        } catch (error) {
            console.error('Error debug:', error);
            await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` });
        }
    }
};
