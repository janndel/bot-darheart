const fs = require('fs');
const os = require('os');
const path = require('path');
const { formatearBytes } = require('../../lib/storage');

const GALERIA = path.join(os.homedir(), 'storage', 'movies');

function listarArchivos() {
    try {
        return fs.readdirSync(GALERIA)
            .map(nombre => {
                const ruta = path.join(GALERIA, nombre);
                try {
                    const st = fs.statSync(ruta);
                    return st.isFile() ? { nombre, ruta, size: st.size, mtime: st.mtimeMs } : null;
                } catch { return null; }
            })
            .filter(Boolean)
            .sort((a, b) => b.mtime - a.mtime);
    } catch { return []; }
}

function enviarArchivo(sock, chatId, archivo) {
    const stream = fs.createReadStream(archivo.ruta);
    const nombre = archivo.nombre;
    const caption = `📁 *${nombre}*\n📹 ${formatearBytes(archivo.size)}\n\n_DARHEART Bot_`;
    if (archivo.size <= 15 * 1024 * 1024) {
        return sock.sendMessage(chatId, { video: stream, mimetype: 'video/mp4', caption });
    }
    return sock.sendMessage(chatId, { text: `⚠️ El archivo supera el límite de 15 MB para ahorrar datos del servidor.` });
}

module.exports = {
    name: 'guardados',
    alias: ['galeria', 'media', 'archivos'],
    category: 'general',
    desc: 'Muestra, envía o borra videos guardados en la galería',
    oculto: true,
    ownerOnly: true,
    timeout: 15000,
    async execute(sock, msg, args, { chatId }) {
        const sub = (args[0] || '').toLowerCase();
        const archivos = listarArchivos();

        if (sub === 'enviar') {
            const n = Number(args[1]);
            if (!n || n < 1 || n > archivos.length) {
                return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,guardados enviar <número>' });
            }
            try {
                await enviarArchivo(sock, chatId, archivos[n - 1]);
            } catch (e) {
                await sock.sendMessage(chatId, { text: `❌ No se pudo enviar: ${String(e.message).slice(0, 300)}` });
            }
            return;
        }

        if (sub === 'borrar') {
            const n = Number(args[1]);
            const confirmar = (args[2] || '').toLowerCase() === 'confirmar';
            if (!n || n < 1 || n > archivos.length || !confirmar) {
                return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,guardados borrar <número> confirmar' });
            }
            try {
                fs.unlinkSync(archivos[n - 1].ruta);
                await sock.sendMessage(chatId, { text: `🗑️ Borrado: ${archivos[n - 1].nombre}` });
            } catch (e) {
                await sock.sendMessage(chatId, { text: `❌ No se pudo borrar: ${String(e.message).slice(0, 300)}` });
            }
            return;
        }

        if (sub === 'limpiar') {
            const dias = Number(args[1]) || 30;
            const corte = Date.now() - dias * 86400000;
            let borrados = 0;
            for (const archivo of archivos) {
                if (archivo.mtime < corte) {
                    try { fs.unlinkSync(archivo.ruta); borrados++; } catch {}
                }
            }
            return await sock.sendMessage(chatId, { text: `🧹 Limpieza galería (${dias}d): ${borrados} archivo(s) eliminado(s).` });
        }

        if (!archivos.length) {
            return await sock.sendMessage(chatId, { text: '📭 No hay archivos guardados en la galería.' });
        }

        const lineas = archivos.slice(0, 15).map((a, i) => `${i + 1}. ${a.nombre}\n   📹 ${formatearBytes(a.size)} · ${new Date(a.mtime).toLocaleDateString('es-VE')}`);
        await sock.sendMessage(chatId, {
            text: `📁 *GUARDADOS EN LA GALERÍA*\n\n${lineas.join('\n\n')}\n\nUsa: ,guardados enviar <n> | ,guardados borrar <n> confirmar | ,guardados limpiar <días>`
        });
    }
};
