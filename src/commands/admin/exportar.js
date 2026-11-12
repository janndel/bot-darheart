const {
    obtenerParticipantes,
    obtenerActivosDelGrupo,
    formatearMencion,
    soloNumero
} = require('../../lib/grupo');

module.exports = {
    name: 'exportar',
    alias: ['export', 'csv', 'exportaractividad'],
    category: 'admin',
    desc: 'Exporta la actividad del grupo a formato CSV (texto)',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        try {
            const metadata = await sock.groupMetadata(chatId);
            const participantes = metadata.participants || [];
            const activosGrupo = obtenerActivosDelGrupo(chatId);

            const filas = participantes.map(p => {
                const num = soloNumero(p.id);
                const d = activosGrupo[num];
                const count = typeof d === 'number' ? d : (d ? d.count : 0);
                const lastSeen = typeof d === 'number' ? '' : (d ? new Date(d.lastSeen || 0).toISOString() : '');
                return `${num},${p.admin || 'member'},${count},${lastSeen}`;
            });

            const csv = [
                'numero,rol,mensajes,ultima_actividad',
                ...filas
            ].join('\n');

            const nombre = `actividad_${chatId.split('@')[0]}_${Date.now()}.csv`;

            await sock.sendMessage(chatId, {
                text: `📊 *EXPORTACIÓN DE ACTIVIDAD*\n\n` +
                      `📁 Archivo: ${nombre}\n` +
                      `👥 Filas: ${filas.length}\n\n` +
                      `━━━━━━━━━━━━━━━━━━\n${csv.slice(0, 3000)}\n` +
                      (csv.length > 3000 ? '\n... (truncado)' : '') +
                      `\n━━━━━━━━━━━━━━━━━━`,
                mentions: [formatearMencion(msg.key.participant || msg.key.remoteJid)]
            });
        } catch (error) {
            console.error('Error exportar:', error.message);
            await sock.sendMessage(chatId, { text: '❌ No se pudo exportar la actividad.' });
        }
    }
};
