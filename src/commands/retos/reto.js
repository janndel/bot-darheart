const { pools } = require('../../lib/pack-data');

const retos = pools.retosPicantes;

function limpiarJid(jid) {
    const [num, dom] = jid.split('@');
    return `${num.split(':')[0]}@${dom}`;
}

module.exports = {
    name: 'reto',
    alias: ['retohot', 'retoaleatorio', 'challenge', 'reto18'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        try {
            const metadata = await sock.groupMetadata(chatId);
            const participantes = metadata.participants.map(p => limpiarJid(p.id));

            if (participantes.length === 0) {
                return await sock.sendMessage(chatId, { text: '❌ No hay miembros en el grupo.' });
            }

            const elegidoJid = participantes[Math.floor(Math.random() * participantes.length)];
            const numElegido = elegidoJid.split('@')[0];
            const reto = retos[Math.floor(Math.random() * retos.length)];

            await sock.sendMessage(chatId, {
                text: `🎯 *RETO HOT* 🔞🔥\n\n` +
                      `🎰 *Elegido:* @${numElegido}\n\n` +
                      `🥵 *Tu reto es:*\n${reto}\n\n` +
                      `⏱️ _Tienes 5 minutos para cumplirlo_\n` +
                      `⚠️ _Si no lo cumples, te van a funar_ 😈`,
                mentions: [elegidoJid]
            });
            console.log(`🎯 Reto hot asignado a ${numElegido}`);
        } catch (error) {
            console.error('Error reto:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
