const path = require('path');
const { readJson, writeJsonAtomic } = require('./json-store');

const HOME = process.env.HOME || '/data/data/com.termux/files/home';
const FILE = path.join(HOME, 'recordatorios.json');
const MAX_DELAY = 2 ** 31 - 1;
const timers = new Map();
let sockActual = null;

function cargar() {
    const data = readJson(FILE, { items: [] });
    if (Array.isArray(data)) return { items: data };
    if (!Array.isArray(data.items)) data.items = [];
    return data;
}

function guardar(data) {
    writeJsonAtomic(FILE, data);
}

function setSock(sock) {
    sockActual = sock;
}

function formatearFecha(ms) {
    try {
        return new Date(ms).toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' });
    } catch {
        return new Date(ms).toISOString();
    }
}

async function enviar(sock, item, atrasado = false) {
    const texto = [
        `⏰ *Recordatorio${atrasado ? ' atrasado' : ''}*`,
        '',
        item.texto,
        '',
        `_Programado: ${formatearFecha(item.cuando)}_`
    ].join('\n');
    await sock.sendMessage(item.chatId, { text: texto });
}

function eliminar(id) {
    const data = cargar();
    const antes = data.items.length;
    data.items = data.items.filter(i => i.id !== id);
    if (data.items.length !== antes) guardar(data);
}

const UNIDADES = {
    segundos: 1000,
    minutos: 60000,
    horas: 3600000,
    dias: 86400000,
    semanas: 604800000
};

function armar(item, sock) {
    if (timers.has(item.id)) clearTimeout(timers.get(item.id));
    const restante = Math.max(0, Number(item.cuando) - Date.now());
    if (restante > MAX_DELAY) {
        const t = setTimeout(() => armar(item, sock), MAX_DELAY);
        t.unref?.();
        timers.set(item.id, t);
        return;
    }
    const t = setTimeout(async () => {
        timers.delete(item.id);
        const actual = sockActual || sock;
        if (!actual) return;
        await ejecutarYReprogramar(actual, item);
    }, restante);
    t.unref?.();
    timers.set(item.id, t);
}

function programar(sock, { chatId, texto, cuando, autor = '', patron = null }) {
    setSock(sock);
    const data = cargar();
    const id = `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
    const item = {
        id,
        chatId,
        texto: String(texto || '').slice(0, 500),
        cuando: Number(cuando),
        creado: Date.now(),
        autor: String(autor || ''),
        patron: patron || null
    };
    data.items.push(item);
    guardar(data);
    armar(item, sock);
    return item;
}

function programarRecurrente(sock, opts) {
    return programar(sock, opts);
}

function patronMs(patron) {
    if (!patron) return 0;
    const unit = String(patron.unit || '').toLowerCase();
    const value = Number(patron.value) || 0;
    const factor = UNIDADES[unit];
    if (!factor || value <= 0) return 0;
    return value * factor;
}

async function ejecutarYReprogramar(sock, item) {
    try {
        await enviar(sock, item, Date.now() > Number(item.cuando) + 60000);
    } catch (e) {
        item.intentos = (Number(item.intentos) || 0) + 1;
        if (item.intentos < 3) {
            item.cuando = Date.now() + 60000;
            const data = cargar();
            const i = data.items.findIndex(x => x.id === item.id);
            if (i >= 0) { data.items[i] = item; guardar(data); }
            armar(item, sock);
            return;
        }
    }
    if (item.patron) {
        const ms = patronMs(item.patron);
        if (ms > 0) {
            const data = cargar();
            const i = data.items.findIndex(x => x.id === item.id);
            if (i >= 0) data.items.splice(i, 1);
            const nuevo = programar(sock, {
                chatId: item.chatId,
                texto: item.texto,
                cuando: Date.now() + ms,
                autor: item.autor,
                patron: item.patron
            });
            return;
        }
    }
    eliminar(item.id);
}

function parsearRecurrencia(texto) {
    const m = texto.match(/cada\s+(\d+)\s*(segundos|minutos|horas|días|semanas)/i);
    if (!m) return null;
    const value = Number(m[1]);
    const unit = m[2].toLowerCase();
    if (unit === 'días') return { unit: 'dias', value };
    return { unit, value };
}

function listar(chatId) {
    return cargar().items
        .filter(i => !chatId || i.chatId === chatId)
        .sort((a, b) => a.cuando - b.cuando);
}

function cancelar(id, chatId) {
    const data = cargar();
    const item = data.items.find(i => i.id === id && (!chatId || i.chatId === chatId));
    if (!item) return false;
    if (timers.has(item.id)) clearTimeout(timers.get(item.id));
    timers.delete(item.id);
    data.items = data.items.filter(i => i.id !== item.id);
    guardar(data);
    return true;
}

async function restaurar(sock) {
    setSock(sock);
    const data = cargar();
    for (const item of data.items) {
        const delay = Number(item.cuando) - Date.now();
        if (delay <= -5 * 60 * 1000 && !item.intentos) {
            try {
                await enviar(sock, item, true);
                eliminar(item.id);
                continue;
            } catch {}
        }
        armar(item, sock);
    }
    return data.items.length;
}

module.exports = {
    FILE,
    setSock,
    programar,
    programarRecurrente,
    ejecutarYReprogramar,
    parsearRecurrencia,
    listar,
    cancelar,
    restaurar,
    formatearFecha
};
