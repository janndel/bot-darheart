const {
    obtenerAdmins,
    obtenerSender,
    crearReporte
} = require('../../lib/grupo');

function limpiarJid(jid) {
    if (!jid) return '';
    const [num, dom] = String(jid).split('@');
    return `${num.split(':')[0]}@${dom || 's.whatsapp.net'}`;
}

function numeroDe(jid) {
    return String(jid || '').split('@')[0].split(':')[0];
}

module.exports = {
    name: 'reporte',
    alias: ['denuncia', 'r', 'report', 'ticket', 'sug', 'suggest'],
    category: 'general',
    desc: 'Reporta una situación mencionando a los admins. Genera un ticket de seguimiento.',
    async execute(sock, msg, args, { chatId }) {
        try {
            if (!chatId.endsWith('@g.us')) {
                return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
            }

            if (args.length === 0) {
                return await sock.sendMessage(chatId, {
                    text: '⚠️ *USO CORRECTO*\n\nEscribe el motivo del reporte.\n\nEjemplo: ,reporte @usuario está haciendo spam\n\n🔧 Usa ,reportes para ver tickets abiertos.'
                });
            }

            const motivo = args.join(' ');
            const sender = await obtenerSender(sock, msg);
            const senderNum = numeroDe(sender);

            let metadata;
            try {
                metadata = await sock.groupMetadata(chatId);
            } catch {
                return await sock.sendMessage(chatId, { text: '❌ No se pudo obtener la información del grupo.' });
            }

            const admins = await obtenerAdmins(sock, chatId);
            if (admins.length === 0) {
                return await sock.sendMessage(chatId, {
                    text: '❌ No hay administradores en este grupo para notificar.'
                });
            }

            const ticketId = crearReporte(chatId, {
                autor: sender,
                autorNum: senderNum,
                motivo,
                grupo: metadata.subject || 'Grupo'
            });

            const ahora = new Date().toLocaleString('es-ES', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });

            const adminTexto = admins.map(a => `@${numeroDe(a.id)}`).join(' ');
            const mentions = [limpiarJid(sender), ...admins.map(a => limpiarJid(a.id))];

            await sock.sendMessage(chatId, {
                text: `🚨 *REPORTE — TICKET #${ticketId}*\n\n` +
                      `━━━━━━━━━━━━━━━━━━\n` +
                      `👤 Reportado por: @${senderNum}\n` +
                      `📅 Fecha: ${ahora}\n` +
                      `📝 Motivo: ${motivo}\n` +
                      `━━━━━━━━━━━━━━━━━━\n` +
                      `👮 Admins notificados: ${adminTexto}\n\n` +
                      `✅ Ticket creado. Los administradores han sido notificados.\n` +
                      `🔍 Usa ,reportes para ver tickets abiertos.`,
                mentions
            });
        } catch (e) {
            console.error('❌ Error crítico en reporte:', e.message);
            await sock.sendMessage(chatId, { text: '❌ Error inesperado en el comando.' });
        }
    }
};
