const dns = require('dns').promises;

const CACHE_DNS = new Map();
const TTL_DNS = 5 * 60 * 1000;

function esIpLiteral(host) {
    const h = String(host || '').toLowerCase().replace(/^\[|\]$/g, '');
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) return true;
    return h.includes(':');
}

function ipPrivada(ip) {
    const valor = String(ip || '').toLowerCase().replace(/^\[|\]$/g, '');
    if (valor.includes(':')) {
        return valor === '::1' || valor === '::' || valor.startsWith('fc') || valor.startsWith('fd') ||
            valor.startsWith('fe80') || valor.startsWith('ff') || valor.startsWith('::ffff:127.') ||
            valor.startsWith('::ffff:10.') || valor.startsWith('::ffff:192.168.') ||
            /^::ffff:172\.(1[6-9]|2\d|3[01])\./.test(valor);
    }
    const m = valor.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (!m) return false;
    const o = m.slice(1).map(Number);
    if (o.some(n => n < 0 || n > 255)) return true;
    return o[0] === 0 || o[0] === 10 || o[0] === 127 ||
        (o[0] === 100 && o[1] >= 64 && o[1] <= 127) ||
        (o[0] === 169 && o[1] === 254) ||
        (o[0] === 172 && o[1] >= 16 && o[1] <= 31) ||
        (o[0] === 192 && o[1] === 168) ||
        (o[0] === 192 && o[1] === 0 && (o[2] === 0 || o[2] === 2)) ||
        (o[0] === 198 && (o[1] === 18 || o[1] === 19)) ||
        o[0] >= 224;
}

function hostBloqueado(host) {
    const h = String(host || '').toLowerCase().replace(/\.$/, '').replace(/^\[|\]$/g, '');
    if (!h) return true;
    if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') ||
        h.endsWith('.internal') || h.endsWith('.home') || h.endsWith('.lan') ||
        h === 'metadata.google.internal' || h === 'metadata') return true;
    if (esIpLiteral(h)) return true;
    return false;
}

function parseHttpUrl(valor) {
    try {
        const url = new URL(String(valor || '').trim());
        if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
        if (url.username || url.password) return null;
        if (!url.hostname || !url.hostname.includes('.')) return null;
        if (hostBloqueado(url.hostname)) return null;
        return url;
    } catch {
        return null;
    }
}

function validarUrlDescarga(valor) {
    const texto = String(valor || '').trim();
    if (!texto) return { ok: false, error: 'Falta el enlace.' };
    const url = parseHttpUrl(texto);
    if (!url) return { ok: false, error: 'Enlace inválido o bloqueado por seguridad.' };
    return { ok: true, url };
}

async function resolverHostSeguro(valor) {
    const parsed = parseHttpUrl(valor);
    if (!parsed) return { ok: false, error: 'Enlace inválido o bloqueado por seguridad.' };
    const host = parsed.hostname.toLowerCase().replace(/\.$/, '');
    const cache = CACHE_DNS.get(host);
    if (cache && cache.expira > Date.now()) return cache.resultado;

    let resultado;
    try {
        const direcciones = await dns.lookup(host, { all: true, verbatim: true });
        if (!direcciones.length) resultado = { ok: false, error: 'El dominio no resolvió.' };
        else if (direcciones.some(d => ipPrivada(d.address))) resultado = { ok: false, error: 'El dominio apunta a una red privada.' };
        else resultado = { ok: true };
    } catch (e) {
        resultado = { ok: false, error: `No se pudo resolver el dominio: ${e.code || e.message}` };
    }
    CACHE_DNS.set(host, { expira: Date.now() + TTL_DNS, resultado });
    return resultado;
}

function esUrlHttp(valor) {
    return Boolean(parseHttpUrl(valor));
}

function hostname(valor) {
    const url = parseHttpUrl(valor);
    return url ? url.hostname.toLowerCase() : '';
}

function esDominio(valor, ...dominios) {
    const host = hostname(valor);
    if (!host) return false;
    return dominios.some(d => host === d || host.endsWith(`.${d}`));
}

module.exports = {
    parseHttpUrl,
    validarUrlDescarga,
    resolverHostSeguro,
    hostBloqueado,
    ipPrivada,
    esIpLiteral,
    esUrlHttp,
    hostname,
    esDominio
};
