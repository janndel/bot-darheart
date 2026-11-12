const reminders = require('../../lib/reminders');

module.exports = {
    name: 'recordatorios',
    alias: ['recordatorios2', 'lista_recordatorios'],
    category: 'general',
    desc: 'Lista o cancela recordatorios',
    oculto: true,
    selfOnly: true,
    timeout: 30000,
    async execute(sock, msg, args, { chatId }) {
        if (['borrar', 'cancelar', 'eliminar'].includes(String(args[0] || '').toLowerCase())) {
            const id = args[1];
            if (!id) return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,recordatorios borrar <id>' });
            const ok = reminders.cancelar(id, chatId);
            return await sock.sendMessage(chatId, {
                text: ok ? `🚫 Recordatorio ${id} cancelado.` : '⚠️ No encontré ese recordatorio.'
            });
        }
        const items = reminders.listar(chatId);
        if (!items.length) return await sock.sendMessage(chatId, { text: '📭 No tienes recordatorios.' });
        const lineas = items.map(i => `🆔 ${i.id}\n🕒 ${reminders.formatearFecha(i.cuando)}\n📝 ${i.texto}`).join('\n\n');
        await sock.sendMessage(chatId, { text: `⏰ *TUS RECORDATORIOS*\n\n${lineas}` });
    }
};
