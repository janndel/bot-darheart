'use strict';

const { obtenerActivosDelGrupo } = require('../../lib/grupo');
const { esOwner } = require('../../lib/permissions');

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

function tieneActividad(activos, p) {
    for (const a of aliasParticipante(p)) {
        if (Object.prototype.hasOwnProperty.call(activos, a)) return true;
    }
    return false;
}

module.exports = {
    name: 'topinactivos',
    alias: ['inactivos'],
    category: 'admin',
    desc: 'Muestra integrantes sin actividad con menciones reales (igual que ,reto)',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        try {
            const limpiar = args.includes('limpiar') || args.includes('purge');
            const esOw = esOwner(sock, msg);

            if (limpiar && !esOw) {
                return await sock.sendMessage(chatId, { text: '🔒 Solo el owner puede expulsar inactivos.' });
            }

            const metadata = await sock.groupMetadata(chatId);
            const participantes = metadata.participants || [];

            if (participantes.length === 0) {
                return await sock.sendMessage(chatId, { text: '❌ No hay miembros en el grupo.' });
            }

            const activos = obtenerActivosDelGrupo(chatId) || {};
            const botNum = numeroDe(sock.user?.id || '');

            const inactivos = participantes.filter(p => {
                if (botNum && aliasParticipante(p).has(botNum)) return false;
                return !tieneActividad(activos, p);
            });

            if (inactivos.length === 0) {
                return await sock.sendMessage(chatId, {
                    text: '💤 *MIEMBROS SIN ACTIVIDAD*\n\nTodos los integrantes tienen actividad registrada. ✅'
                });
            }

            if (limpiar) {
                let ok = 0;
                let fail = 0;
                for (const p of inactivos) {
                    try {
                        await sock.groupParticipantsUpdate(chatId, [p.id], 'remove');
                        ok++;
                        await new Promise(r => setTimeout(r, 800));
                    } catch { fail++; }
                }
                return await sock.sendMessage(chatId, {
                    text: `🧹 *LIMPIEZA COMPLETADA*\n✅ Expulsados: ${ok}\n❌ Fallos: ${fail}`
                });
            }

            const top10 = inactivos.slice(0, 10);
            const lineas = top10.map((p, i) => `${i + 1}. ▪️ @${numeroDe(p.id)}`).join('\n');

            await sock.sendMessage(chatId, {
                text: `💤 *MIEMBROS SIN ACTIVIDAD*\n\n${lineas}\n\n👥 ${inactivos.length} de ${participantes.length} sin actividad\n🔧 ,topinactivos limpiar (owner)`,
                mentions: top10.map(p => limpiarJid(p.id))
            });
        } catch (error) {
            console.error('Error topinactivos:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
