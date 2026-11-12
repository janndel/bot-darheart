const OWNERS = ['75501934751805', '584164659101', '584162662671'];

function soloNumero(jid) {
    return String(jid || '').split('@')[0].split(':')[0];
}

function esOwner(jid) {
    return OWNERS.includes(soloNumero(jid));
}

module.exports = {
    name: 'kickall',
    alias: ['expulsartodos'],
    category: 'admin',
    desc: 'Expulsar a todos los no-admins (peligroso, solo owner)',
    async execute(sock, msg, args, { chatId }) {
        const sender = msg.key.participant || msg.key.remoteJid || chatId;
        if (!esOwner(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Solo el owner puede usar este comando.' });
        }

        if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });

        if (args[0]?.toLowerCase() !== 'confirmar') {
            return await sock.sendMessage(chatId, {
                text: `⚠️ *ADVERTENCIA*\n\nEsto expulsará a TODOS los no-admins del grupo.\n\n_Confirmar:_ ,kickall confirmar`
            });
        }

        try {
            const metadata = await sock.groupMetadata(chatId);
            const soloNum = (j) => j.split('@')[0].split(':')[0];
            const botNum = soloNum(sock.user.id);
            const botLid = sock.user.lid ? soloNum(sock.user.lid) : null;

            const aExpulsar = metadata.participants
                .filter(p => {
                    const pNum = soloNum(p.id);
                    const pLid = p.lid ? soloNum(p.lid) : null;
                    if (!p.admin) return true;
                    // No expulsar al bot
                    if (pNum === botNum || (botLid && (pNum === botLid || pLid === botLid))) return false;
                    return false;
                })
                .map(p => p.id);

            if (aExpulsar.length === 0) {
                return await sock.sendMessage(chatId, { text: '⚠️ No hay no-admins que expulsar.' });
            }

            await sock.sendMessage(chatId, { text: `🚨 Expulsando a ${aExpulsar.length} miembros...` });

            for (const jid of aExpulsar) {
                try {
                    await sock.groupParticipantsUpdate(chatId, [jid], 'remove');
                    await new Promise(r => setTimeout(r, 800));
                } catch (e) {}
            }

            await sock.sendMessage(chatId, { text: `✅ *Kickall completado.*` });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
