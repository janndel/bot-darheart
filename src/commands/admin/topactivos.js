'use strict';

const { obtenerActivosDelGrupo } = require('../../lib/grupo');

function limpiarJid(jid) {
    if (!jid) return '';
    const [num, dom] = String(jid).split('@');
    return `${num.split(':')[0]}@${dom || 's.whatsapp.net'}`;
}

function numeroDe(jid) {
    return String(jid).split('@')[0].split(':')[0];
}

function aliasParticipante(p) {
    const alias = new Set();
    for (const campo of [p.id, p.lid, p.phoneNumber]) {
        if (!campo) continue;
        alias.add(String(campo).split('@')[0].split(':')[0]);
    }
    return alias;
}

module.exports = {
    name: 'topactivos',
    alias: ['topactive', 'ranking'],
    category: 'admin',
    desc: 'Muestra integrantes con menciones reales (igual que ,reto)',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        try {
            const metadata = await sock.groupMetadata(chatId);
            const participantes = metadata.participants || [];

            if (participantes.length === 0) {
                return await sock.sendMessage(chatId, { text: '❌ No hay miembros en el grupo.' });
            }

            const activos = obtenerActivosDelGrupo(chatId) || {};
            const porAlias = new Map();
            for (const p of participantes) {
                for (const a of aliasParticipante(p)) {
                    if (!porAlias.has(a)) porAlias.set(a, p);
                }
            }

            const ranking = Object.entries(activos)
                .map(([clave, d]) => {
                    const p = porAlias.get(numeroDe(clave));
                    const count = typeof d === 'number' ? d : Number(d && d.count) || 0;
                    return p ? { p, count } : null;
                })
                .filter(Boolean)
                .sort((a, b) => b.count - a.count);

            const conDatos = ranking.length > 0;
            const lista = conDatos
                ? ranking.slice(0, 10)
                : participantes.slice(0, 10).map(p => ({ p, count: 0 }));

            const lineas = lista.map((item, i) => {
                const num = numeroDe(item.p.id);
                return conDatos
                    ? `${i + 1}. ▪️ @${num} — ${item.count} msj`
                    : `${i + 1}. ▪️ @${num}`;
            }).join('\n');

            const titulo = conDatos ? '🔥 *TOP ACTIVOS*' : '👥 *PARTICIPANTES (1-10)*';
            const resumen = conDatos
                ? `👥 Con actividad: ${ranking.length} de ${participantes.length}`
                : `👥 Total: ${participantes.length}`;

            await sock.sendMessage(chatId, {
                text: `${titulo}\n\n${lineas}\n\n${resumen}`,
                mentions: lista.map(item => limpiarJid(item.p.id))
            });
        } catch (error) {
            console.error('Error topactivos:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
