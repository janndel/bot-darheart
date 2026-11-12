'use strict';

const fs = require('fs');
const path = require('path');
const { readJson, writeJsonAtomic } = require('./json-store');

const HOME = process.env.HOME || '/app';
const ACTIVOS_FILE = path.join(HOME, 'activos.json');
const REPORTES_FILE = path.join(HOME, 'reportes.json');

/**
 * Extrae solo el número de un JID, quitando @s.whatsapp.net, @g.us, etc.
 * @param {string} jid - Ej: '5841234567@s.whatsapp.net' o '5841234567@g.us' o '120363012345678901@g.us'
 * @returns {string} - Solo el número: '5841234567'
 */
function normalizarNumero(jid) {
    if (!jid) return '';
    const base = String(jid).split('@')[0].split(':')[0];
    const solo = base.replace(/\D/g, '');
    if (solo.length < 8 || solo.length > 15) return '';
    return solo;
}

/**
 * Formatea un JID para mención en Baileys: '5841234567@s.whatsapp.net'
 * @param {string} numero - Solo números, ej: '5841234567'
 * @returns {string} - JID para mención
 */
function formatearMencion(jid) {
    if (!jid) return '';
    const texto = String(jid);
    if (texto.includes('@')) {
        const [num, dom] = texto.split('@');
        return `${num.split(':')[0]}@${dom || 's.whatsapp.net'}`;
    }
    const solo = texto.replace(/\D/g, '');
    if (!solo) return '';
    const dominio = solo.length >= 14 ? 'lid' : 's.whatsapp.net';
    return `${solo}@${dominio}`;
}

/**
 * Convierte un JID completo a solo número
 * @param {string} jidCompleto - Ej: '5841234567@s.whatsapp.net'
 * @returns {string} - Solo número: '5841234567'
 */
function extraerNumero(jidCompleto) {
    return normalizarNumero(jidCompleto);
}

/**
 * Crea array de menciones a partir de una lista de JIDs o números.
 * Acepta tanto strings JID completos como objetos {id}.
 * @param {Array} items - Array de strings JID o objetos con .id
 * @returns {Array} - Array de JIDs en formato @s.whatsapp.net
 */
function mencionesDe(items) {
    if (!items) return [];
    return items
        .map(item => {
            if (typeof item === 'string') return formatearMencion(item);
            if (item && typeof item === 'object' && item.id) return formatearMencion(item.id);
            return '';
        })
        .filter(Boolean);
}

function numero(jid) {
    return normalizarNumero(jid);
}

function soloNumero(jid) {
    return normalizarNumero(jid);
}

function cargarJSON(file, def = {}) {
    return readJson(file, def);
}

function guardarJSON(file, data) {
    return writeJsonAtomic(file, data);
}

let cacheActivos = null;
let timerGuardadoActivos = null;

function cargarActivos() {
    if (cacheActivos === null) cacheActivos = cargarJSON(ACTIVOS_FILE, {});
    return cacheActivos;
}

function guardarActivos(data) {
    cacheActivos = data;
    return guardarJSON(ACTIVOS_FILE, data);
}

function flushActivos() {
    if (timerGuardadoActivos) {
        clearTimeout(timerGuardadoActivos);
        timerGuardadoActivos = null;
    }
    if (cacheActivos === null) return;
    try { guardarJSON(ACTIVOS_FILE, cacheActivos); } catch (e) {}
}

function programarGuardadoActivos() {
    if (timerGuardadoActivos) return;
    timerGuardadoActivos = setTimeout(() => {
        timerGuardadoActivos = null;
        if (cacheActivos !== null) {
            try { guardarJSON(ACTIVOS_FILE, cacheActivos); } catch (e) {}
        }
    }, 2000);
    timerGuardadoActivos.unref?.();
}

process.once('exit', () => { try { flushActivos(); } catch (e) {} });

function obtenerActivosDelGrupo(chatId) {
    return cargarActivos()[chatId] || {};
}

function registrarActividad(chatId, usuario, cantidad = 1) {
    const data = cargarActivos();
    if (!data[chatId]) data[chatId] = {};
    const jidUsuario = String(usuario || '').split('@')[0].split(':')[0];
    const jidChat = String(chatId || '').split('@')[0].split(':')[0];
    if (!jidUsuario || jidUsuario === jidChat) return null;
    const clave = normalizarNumero(usuario);
    if (!clave) return null;
    const ahora = Date.now();
    const previo = data[chatId][clave];
    let registro;
    if (typeof previo === 'number') {
        registro = { count: previo, firstSeen: ahora, lastSeen: ahora };
    } else if (previo && typeof previo === 'object') {
        registro = previo;
    } else {
        registro = { count: 0, firstSeen: ahora, lastSeen: ahora };
    }
    registro.count = (Number(registro.count) || 0) + cantidad;
    registro.lastSeen = ahora;
    if (!registro.firstSeen) registro.firstSeen = ahora;
    data[chatId][clave] = registro;
    programarGuardadoActivos();
    return registro;
}

function extraerMencionados(msg) {
    return msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
}

async function obtenerMetadata(sock, chatId) {
    return await sock.groupMetadata(chatId);
}

async function obtenerParticipantes(sock, chatId) {
    const metadata = await obtenerMetadata(sock, chatId);
    return metadata.participants || [];
}

async function obtenerAdmins(sock, chatId) {
    const participantes = await obtenerParticipantes(sock, chatId);
    return participantes.filter(p => p.admin === 'admin' || p.admin === 'superadmin');
}

async function esAdminEnGrupo(sock, chatId, jid) {
    const num = normalizarNumero(jid);
    const admins = await obtenerAdmins(sock, chatId);
    return admins.some(a => normalizarNumero(a.id) === num || (a.lid && normalizarNumero(a.lid) === num));
}

async function obtenerSender(sock, msg) {
    return msg.key.participant || msg.key.remoteJid;
}

function cargarReportes() {
    const REPORTES_FILE = path.join(HOME, 'reportes.json');
    return cargarJSON(REPORTES_FILE, {});
}

function guardarReportes(data) {
    return guardarJSON(REPORTES_FILE, data);
}

function crearReporte(chatId, reporte) {
    const data = cargarReportes();
    if (!data[chatId]) data[chatId] = [];
    const id = `T${Date.now().toString(36).toUpperCase()}`;
    data[chatId].push({ id, ...reporte, creado: Date.now(), estado: 'abierto' });
    guardarReportes(data);
    return id;
}

function obtenerReportesAbiertos(chatId) {
    const data = cargarReportes();
    return (data[chatId] || []).filter(r => r.estado === 'abierto');
}

function statsGrupo(activosGrupo, participantes) {
    // Normalizar números de todos los participantes actuales
    const numsGrupo = new Set(participantes.map(p => normalizarNumero(p.id)).filter(Boolean));

    const ranking = Object.entries(activosGrupo)
        .filter(([num]) => numsGrupo.has(num))
        .map(([num, d]) => ({
            num: normalizarNumero(num),
            count: typeof d === 'number' ? d : (d.count || 0),
            lastSeen: typeof d === 'number' ? 0 : (d.lastSeen || 0)
        }))
        .sort((a, b) => b.count - a.count);

    const total = ranking.reduce((acc, r) => acc + r.count, 0);
    const promedio = ranking.length ? Math.round(total / ranking.length) : 0;
    const top10 = ranking.slice(0, 10);
    // Inactivos: participantes en el grupo que NO tienen registro en activos
    const inactivos = participantes.filter(p => !activosGrupo[normalizarNumero(p.id)]);

    return { ranking, total, promedio, top10, inactivos, totalMiembros: participantes.length };
}

function barraASCII(valor, maximo, ancho = 20) {
    if (maximo === 0) return '▱'.repeat(ancho);
    const llenado = Math.round((valor / maximo) * ancho);
    return '█'.repeat(llenado) + '░'.repeat(ancho - llenado);
}

module.exports = {
    normalizarNumero,
    formatearMencion,
    extraerNumero,
    mencionesDe,
    numero,
    soloNumero,
    cargarJSON,
    guardarJSON,
    cargarActivos,
    guardarActivos,
    flushActivos,
    obtenerActivosDelGrupo,
    registrarActividad,
    extraerMencionados,
    obtenerMetadata,
    obtenerParticipantes,
    obtenerAdmins,
    esAdminEnGrupo,
    obtenerSender,
    cargarReportes,
    guardarReportes,
    crearReporte,
    obtenerReportesAbiertos,
    statsGrupo,
    barraASCII
};