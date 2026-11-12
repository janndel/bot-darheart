const reminders = require('../../lib/reminders');
const { parsearRecurrencia } = reminders;

function parsearTiempo(valor) {
    const m = String(valor || '').trim().match(/^(\d{1,4})(s|m|h|d)$/i);
    if (!m) return 0;
    const n = Number(m[1]);
    const u = m[2].toLowerCase();
    return n * ({ s: 1000, m: 60000, h: 3600000, d: 86400000 }[u] || 0);
}

module.exports = {
    name: 'recordar',
    alias: ['recordatorio', 'remind'],
    category: 'general',
    desc: 'Programa un recordatorio (uso: ,recordar <tiempo> <texto> o ,cada <texto>)',
    oculto: true,
    selfOnly: true,
    timeout: 30000,
    async execute(sock, msg, args, { chatId }) {
        const first = args[0] || '';
        const mRec = /^cada\s+/i.test(first) ? parsearRecurrencia(first) : null;
        let texto;
        let cuando;

        if (mRec) {
            const value = mRec.value;
            const unit = mRec.unit;
            const UNIDADES = {
                segundos: 1000,
                minutos: 60000,
                horas: 3600000,
                dias: 86400000,
                semanas: 604800000
            };
            const ms = value * UNIDADES[unit] || 0;
            if (ms < 10000) {
                return await sock.sendMessage(chatId, { text: '⚠️ El mínimo es 10 segundos.' });
            }
            if (ms > 30 * 86400000) {
                return await sock.sendMessage(chatId, { text: '⚠️ El máximo es 30 días.' });
            }
            cuando = Date.now() + ms;
            texto = args.slice(1).join(' ').trim();
            if (!texto) {
                return await sock.sendMessage(chatId, {
                    text: '⚠️ Usa: ,cada <texto> (por ejemplo: ,cada sacar la ropa)'
                });
            }
            const item = reminders.programarRecurrente(sock, {
                chatId,
                texto,
                cuando,
                autor: msg.key.participant || msg.key.remoteJid,
                patron: mRec
            });
            await sock.sendMessage(chatId, {
                text: `⏰ *Recordatorio recurrente programado*\n\n📝 ${item.texto}\n🕒 ${reminders.formatearFecha(item.cuando)}\n🆔 ${item.id}\\n\\nUsa ,cancelar ${item.id} para borrarlo.`
            });
        } else {
            const tiempo = parsearTiempo(args[0]);
            texto = args.slice(1).join(' ').trim();
            if (!tiempo || !texto) {
                return await sock.sendMessage(chatId, {
                    text: '⚠️ *Uso:* ,recordar <tiempo> <texto>\n\nEjemplos:\n,recordar 30m sacar la ropa\n,recordar 2h llamar a mamá'
                });
            }
            if (tiempo < 10000) {
                return await sock.sendMessage(chatId, { text: '⚠️ El mínimo es 10 segundos.' });
            }
            if (tiempo > 30 * 86400000) {
                return await sock.sendMessage(chatId, { text: '⚠️ El máximo es 30 días.' });
            }
            const cuando = Date.now() + tiempo;
            const item = reminders.programar(sock, {
                chatId,
                texto,
                cuando,
                autor: msg.key.participant || msg.key.remoteJid
            });
            await sock.sendMessage(chatId, {
                text: `⏰ *Recordatorio programado*\n\n📝 ${item.texto}\n🕒 ${reminders.formatearFecha(item.cuando)}\n🆔 ${item.id}`
            });
        }
    }
};
