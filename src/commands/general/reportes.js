const { obtenerReportesAbiertos, formatearMencion } = require('../../lib/grupo');

function numeroDe(jid) {
    return String(jid || '').split('@')[0].split(':')[0];
}

function jidAutor(autor) {
    return formatearMencion(autor);
}

module.exports = {
    name: 'reportes',
    alias: ['tickets', 'reportesabiertos'],
    category: 'general',
    desc: 'Ver tickets de reporte abiertos en el grupo',
    async execute(sock, msg, args, { chatId }) {
        try {
            if (!chatId.endsWith('@g.us')) {
                return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
            }

            const abiertos = obtenerReportesAbiertos(chatId);

            if (abiertos.length === 0) {
                return await sock.sendMessage(chatId, {
                    text: '📋 *TICKETS ABIERTOS*\n\nNo hay tickets abiertos en este grupo.'
                });
            }

            const lineas = abiertos.map(r => {
                const jid = jidAutor(r.autor);
                const num = numeroDe(jid);
                return `🎫 #${r.id}\n   👤 @${num}\n   📝 ${r.motivo.slice(0, 80)}${r.motivo.length > 80 ? '...' : ''}\n   📅 ${new Date(r.creado).toLocaleString('es-ES')}`;
            }).join('\n\n');

            await sock.sendMessage(chatId, {
                text: `📋 *TICKETS ABIERTOS - ${abiertos.length}*\n\n${lineas}\n\n💡 Usa ,reporte <motivo> para crear uno nuevo.`,
                mentions: abiertos.map(r => formatearMencion(r.autor))
            });
        } catch (e) {
            console.error('❌ Error crítico en reportes:', e.message);
            await sock.sendMessage(chatId, { text: '❌ Error inesperado.' });
        }
    }
};
