module.exports = {
    name: 'botlist',
    alias: ['bots', 'listabots', 'sockets'],
    async execute(sock, msg, args, { chatId }) {
        const esGrupo = chatId.endsWith('@g.us');
        let estado = '';

        if (esGrupo) {
            try {
                const metadata = await sock.groupMetadata(chatId);
                const soloNumero = (jid) => jid.split('@')[0].split(':')[0];
                const botNum = soloNumero(sock.user.id);
                const botLid = sock.user.lid ? soloNumero(sock.user.lid) : null;

                const botEnGrupo = metadata.participants.find(p => {
                    const pNum = soloNumero(p.id);
                    const pLid = p.lid ? soloNumero(p.lid) : null;
                    return pNum === botNum || (botLid && (pNum === botLid || pLid === botLid));
                });

                estado = botEnGrupo?.admin ? '👑 Admin del grupo' : '👤 Miembro';
            } catch (e) {
                estado = '⚠️ No pude leer el grupo';
            }
        } else {
            estado = '💬 Chat privado';
        }

        const texto = 
            `🤖 *BOTS ACTIVOS*\n\n` +
            `┃ *DARHEART* ✦ v1.0\n` +
            `┃ 🟢 Estado: Online\n` +
            `┃ 👤 Owner: JANNDEL\n` +
            `┃ 📌 Prefijo: ${require('fs').existsSync('./config.json') ? JSON.parse(require('fs').readFileSync('./config.json')).prefijo : ','}\n` +
            `┃ 📊 Rol: ${estado}\n` +
            `┃ 🆔 ID: ${sock.user.id.split(':')[0]}\n\n` +
            `_Total: 1 bot activo en este ${esGrupo ? 'grupo' : 'chat'}._`;

        await sock.sendMessage(chatId, { text: texto });
    }
};
