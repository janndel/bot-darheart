const fs = require('fs');
const path = require('path');

const HOME = process.env.HOME || '/data/data/com.termux/files/home';
const FILE = path.join(HOME, 'security.log');
const MAX_BYTES = 2 * 1024 * 1024;

function limpiarTexto(valor, max = 300) {
    return String(valor || '').replace(/[\r\n\t]+/g, ' ').slice(0, max);
}

function rotarSiHaceFalta() {
    try {
        if (!fs.existsSync(FILE)) return;
        if (fs.statSync(FILE).size <= MAX_BYTES) return;
        try { fs.renameSync(FILE, `${FILE}.1`); } catch {}
    } catch {}
}

function registrar(evento, datos = {}) {
    const linea = {
        fecha: new Date().toISOString(),
        evento: limpiarTexto(evento, 40),
        usuario: limpiarTexto(datos.usuario, 40),
        chat: limpiarTexto(datos.chat, 80),
        comando: limpiarTexto(datos.comando, 60),
        detalle: limpiarTexto(datos.detalle, 300)
    };
    try {
        rotarSiHaceFalta();
        fs.appendFileSync(FILE, `${JSON.stringify(linea)}\n`);
    } catch {}
}

module.exports = { FILE, registrar };
