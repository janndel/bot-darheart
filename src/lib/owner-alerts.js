const { OWNER_NUMBERS, numero } = require('./permissions');

let sockActual = null;
const cooldowns = new Map();

function setSock(sock) {
    sockActual = sock || null;
}

function jidOwner(sock) {
    const me = sock?.user || sock?.authState?.creds?.me || {};
    const propio = numero(me.id || me.lid);
    const destino = propio || [...OWNER_NUMBERS][0];
    return destino ? `${destino}@s.whatsapp.net` : null;
}

async function alertar(texto, { clave = 'general', cooldownMs = 60 * 60 * 1000 } = {}) {
    if (!sockActual) return false;
    const ahora = Date.now();
    const ultimo = cooldowns.get(clave) || 0;
    if (ahora - ultimo < cooldownMs) return false;
    cooldowns.set(clave, ahora);
    const jid = jidOwner(sockActual);
    if (!jid) return false;
    try {
        await sockActual.sendMessage(jid, {
            text: `⚠️ *ALERTA DARHEART*\n\n${String(texto || '').slice(0, 1500)}`
        });
        return true;
    } catch {
        return false;
    }
}

module.exports = { setSock, alertar, jidOwner };
