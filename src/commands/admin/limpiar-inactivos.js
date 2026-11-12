const {
    obtenerParticipantes,
    obtenerActivosDelGrupo,
    mencionesDe,
    soloNumero,
    cargarActivos,
    guardarActivos
} = require('../../lib/grupo');
const { esOwner } = require('../../lib/permissions');

module.exports = {
    name: 'limpiar-inactivos',
    alias: ['purgeinactivos', 'limpiarmiembros', 'kickinactivos'],
    category: 'admin',
    desc: 'Expulsa a todos los miembros sin actividad (solo owner)',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        if (!esOwner(sock, msg)) {
            return await sock.sendMessage(chatId, {
                text: '🔒 Solo el owner del bot puede usar esta función.'
            });
        }

        const confirmar = args.includes('confirmar') || args.includes('confirm');

        const participantes = await obtenerParticipantes(sock, chatId);
        const activos = obtenerActivosDelGrupo(chatId);
        const inactivos = participantes.filter(p => !activos[soloNumero(p.id)]);

        if (inactivos.length === 0) {
            return await sock.sendMessage(chatId, {
                text: '💤 No hay miembros inactivos para expulsar.'
            });
        }

        if (!confirmar) {
            const lineas = inactivos.map((p, i) => `${i + 1}. ▪️ @${soloNumero(p.id)}`).join('\n');
            return await sock.sendMessage(chatId, {
                text: `⚠️ *CONFIRMACIÓN DE LIMPIEZA*\n\n${lineas}\n\n` +
                      `━━━━━━━━━━━━━━━━━━\n` +
                      `👥 Se expulsarán ${inactivos.length} miembros.\n` +
                      `🔧 Escribe ,limpiar-inactivos confirmar para ejecutar.\n` +
                      `━━━━━━━━━━━━━━━━━━`,
                mentions: mencionesDe(inactivos.map(p => p.id))
            });
        }

        let exitosos = 0;
        let fallos = 0;
        for (const p of inactivos) {
            try {
                await sock.groupParticipantsUpdate(chatId, [p.id], 'remove');
                exitosos++;
                await new Promise(r => setTimeout(r, 1000));
            } catch { fallos++; }
        }

        await sock.sendMessage(chatId, {
            text: `🧹 *LIMPIEZA COMPLETADA*\n\n` +
                  `━━━━━━━━━━━━━━━━━━\n` +
                  `✅ Expulsados: ${exitosos}\n` +
                  `❌ Fallos: ${fallos}\n` +
                  `━━━━━━━━━━━━━━━━━━`
        });
    }
};
