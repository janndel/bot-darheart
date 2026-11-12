const fs = require('fs');
const path = require('path');

const FILE = path.join(process.env.HOME, 'economia.json');
let cache = null;
let firma = '';

function cargar() {
    try {
        const st = fs.statSync(FILE);
        const actual = `${st.mtimeMs}:${st.size}`;
        if (cache && actual === firma) return cache;
        const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
        cache = data && typeof data === 'object' ? data : {};
        firma = actual;
        return cache;
    } catch {
        if (!cache) cache = {};
        return cache;
    }
}

function guardar(data) {
    cache = data;
    try {
        const tmp = `${FILE}.${process.pid}.tmp`;
        fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
        fs.renameSync(tmp, FILE);
        const st = fs.statSync(FILE);
        firma = `${st.mtimeMs}:${st.size}`;
        return true;
    } catch {
        return false;
    }
}

function limpiarJid(jid) {
    const [n, d] = String(jid || '').split('@');
    if (!n) return '';
    return d ? `${n.split(':')[0]}@${d}` : n.split(':')[0];
}

function numero(jid) {
    return limpiarJid(jid).split('@')[0];
}

function mencionados(msg) {
    return msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
}

function usuario(data, chatId, num) {
    if (!data[chatId]) data[chatId] = {};
    if (!data[chatId][num]) data[chatId][num] = { coins: 0 };
    return data[chatId][num];
}

function parsearCantidad(texto, maximo) {
    const t = String(texto || '').toLowerCase().trim();
    if (['all', 'todo', 'todos', 'max', 'maximo'].includes(t)) {
        return typeof maximo === 'number' ? maximo : null;
    }
    const n = parseInt(t, 10);
    if (!Number.isFinite(n) || n <= 0) return null;
    return n;
}

const APUESTA_MINIMA = 50;
const RACHA_MULT_MAX = 10;

function apuestaOpcional(args, user) {
    const crudo = args && args[0] ? String(args[0]).trim() : '';
    if (!crudo) return { modo: 'libre' };
    const monto = parsearCantidad(crudo, user.coins);
    if (!monto) return { error: `⚠️ Apuesta inválida. Ejemplo: ,comando ${APUESTA_MINIMA}` };
    if (monto < APUESTA_MINIMA) return { error: `⚠️ La apuesta mínima es *${APUESTA_MINIMA}* coins.` };
    if (user.coins < monto) return { error: `❌ Solo tienes *${formatear(user.coins)}* coins.` };
    return { modo: 'apuesta', monto };
}

function multiplicadorRacha(user, campo) {
    const racha = Math.max(0, Math.floor(Number(user[campo]) || 0));
    return Math.min(RACHA_MULT_MAX, 2 + racha);
}

function resolverApuesta(user, monto, gano, campo) {
    const multiplicador = multiplicadorRacha(user, campo);
    if (gano) {
        const pago = monto * multiplicador;
        user.coins += pago;
        user[campo] = Math.min(RACHA_MULT_MAX - 2, Math.max(0, Math.floor(Number(user[campo]) || 0)) + 1);
        return { gano: true, multiplicador, pago, siguiente: multiplicadorRacha(user, campo) };
    }
    user.coins = Math.max(0, user.coins - monto);
    user[campo] = 0;
    return { gano: false, multiplicador, pago: 0, siguiente: 2 };
}

function textoApuesta(res, monto) {
    if (res.gano) {
        return `🎉 ¡Ganaste *${formatear(res.pago)}* coins! (apuesta *${formatear(monto)}* × *x${res.multiplicador}*)\n🔥 Próxima victoria seguida: *x${res.siguiente}*`;
    }
    return `💸 Perdiste *${formatear(monto)}* coins. La racha vuelve a *x2*.`;
}

function cooldownRestante(user, campo, ms = 5 * 1000) {
    const ultimo = Number(user[campo]) || 0;
    if (!ultimo) return 0;
    const restante = ms - (Date.now() - ultimo);
    return restante > 0 ? restante : 0;
}

function marcarCooldown(user, campo) {
    user[campo] = Date.now();
}

function formatear(n) {
    const v = Math.max(0, Math.floor(Number(n) || 0));
    return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function espera(ms) {
    const seg = Math.max(1, Math.ceil(ms / 1000));
    if (seg < 60) return `${seg}s`;
    const min = Math.ceil(seg / 60);
    if (min < 60) return `${min} min`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `${h}h ${m}min` : `${h}h`;
}

function azar(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function elegir(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}

function prob(p) {
    return Math.random() * 100 < p;
}

function seguroActivo(user) {
    return Number(user?.seguroHasta || 0) > Date.now();
}

function aplicarMora(user) {
    const p = user?.prestamo;
    if (!p || !(p.vence > 0)) return 0;
    let veces = 0;
    while (Date.now() > p.vence && veces < 10) {
        p.deuda = Math.ceil(p.deuda * 1.25);
        p.vence += 24 * 60 * 60 * 1000;
        veces++;
    }
    return veces;
}

async function soloGrupo(sock, chatId) {
    if (chatId.endsWith('@g.us')) return false;
    await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
    return true;
}

module.exports = {
    FILE,
    cargar,
    guardar,
    limpiarJid,
    numero,
    mencionados,
    usuario,
    parsearCantidad,
    apuestaOpcional,
    multiplicadorRacha,
    resolverApuesta,
    textoApuesta,
    cooldownRestante,
    marcarCooldown,
    formatear,
    espera,
    azar,
    elegir,
    prob,
    seguroActivo,
    aplicarMora,
    soloGrupo
};
