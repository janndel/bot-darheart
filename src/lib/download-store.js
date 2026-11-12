const path = require('path');
const { readJson, writeJsonAtomic } = require('./json-store');

const HOME = process.env.HOME || '/data/data/com.termux/files/home';
const PENDIENTES = path.join(HOME, 'descargas_pendientes.json');
const FALLIDAS = path.join(HOME, 'descargas_fallidas.json');
const MAX_FALLIDAS = 20;
const MAX_EDAD_PENDIENTE = 24 * 60 * 60 * 1000;

function normalizar(url) {
    return String(url || '').trim();
}

function cargarPendientes() {
    const data = readJson(PENDIENTES, { items: [] });
    return Array.isArray(data.items) ? data.items : [];
}

function guardarPendientes(items) {
    writeJsonAtomic(PENDIENTES, { items: items.slice(-50) });
}

function agregarPendiente(url, chatId, tipo = 'dl') {
    const clave = normalizar(url);
    if (!clave) return;
    const items = cargarPendientes().filter(i => !(i.url === clave && i.chatId === chatId));
    items.push({ url: clave, chatId, tipo, creado: Date.now() });
    guardarPendientes(items);
}

function quitarPendiente(url, chatId) {
    const clave = normalizar(url);
    const items = cargarPendientes().filter(i => !(i.url === clave && i.chatId === chatId));
    guardarPendientes(items);
}

function pendientesRecientes() {
    const limite = Date.now() - MAX_EDAD_PENDIENTE;
    const items = cargarPendientes().filter(i => Number(i.creado) >= limite);
    guardarPendientes(items);
    return items;
}

function cargarFallidas() {
    const data = readJson(FALLIDAS, { items: [] });
    return Array.isArray(data.items) ? data.items : [];
}

function guardarFallidas(items) {
    writeJsonAtomic(FALLIDAS, { items: items.slice(-MAX_FALLIDAS) });
}

function agregarFallida(url, chatId, error) {
    const clave = normalizar(url);
    if (!clave) return;
    const items = cargarFallidas().filter(i => !(i.url === clave && i.chatId === chatId));
    items.push({
        url: clave,
        chatId,
        error: String(error || '').slice(0, 200),
        creado: Date.now()
    });
    guardarFallidas(items);
}

function quitarFallida(url, chatId) {
    const clave = normalizar(url);
    guardarFallidas(cargarFallidas().filter(i => !(i.url === clave && i.chatId === chatId)));
}

function ultimaFallida(chatId) {
    return cargarFallidas()
        .filter(i => !chatId || i.chatId === chatId)
        .sort((a, b) => Number(b.creado) - Number(a.creado))[0] || null;
}

module.exports = {
    PENDIENTES,
    FALLIDAS,
    agregarPendiente,
    quitarPendiente,
    pendientesRecientes,
    agregarFallida,
    quitarFallida,
    ultimaFallida
};
