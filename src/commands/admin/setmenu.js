const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(process.env.HOME, 'config_grupos.json');
const GLOBAL_KEY = '__global__';

function cargar() {
    try { return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); }
    catch { return {}; }
}
function guardar(d) {
    writeJsonAtomic(CONFIG_FILE, d);
}

function mimeDe(buffer) {
    if (buffer[0] === 0x89 && buffer[1] === 0x50) return 'image/png';
    if (buffer[0] === 0x47 && buffer[1] === 0x49) return 'image/gif';
    return 'image/jpeg';
}

async function subirImagen(buffer) {
    const tipo = mimeDe(buffer);
    const ext = tipo === 'image/png' ? 'png' : tipo === 'image/gif' ? 'gif' : 'jpg';
    const nombre = `menu_${Date.now()}.${ext}`;

    const intentos = [
        {
            nombre: 'catbox',
            subir: async () => {
                const fd = new FormData();
                fd.append('reqtype', 'fileupload');
                fd.append('fileToUpload', new Blob([buffer], { type: tipo }), nombre);
                const res = await fetch('https://catbox.moe/user/api.php', {
                    method: 'POST', body: fd, signal: AbortSignal.timeout(60000)
                });
                const url = (await res.text()).trim();
                if (!/^https?:\/\/\S+$/i.test(url)) throw new Error('respuesta invalida');
                return url;
            }
        },
        {
            nombre: 'pomf2',
            subir: async () => {
                const fd = new FormData();
                fd.append('files[]', new Blob([buffer], { type: tipo }), nombre);
                const res = await fetch('https://pomf2.lain.la/upload.php', {
                    method: 'POST', body: fd, signal: AbortSignal.timeout(60000)
                });
                const json = await res.json();
                if (!json?.success || !json?.files?.[0]?.url) throw new Error('respuesta invalida');
                return String(json.files[0].url);
            }
        }
    ];

    for (const intento of intentos) {
        try {
            const url = await intento.subir();
            console.log(`🖼️ Imagen subida a ${intento.nombre}: ${url}`);
            return url;
        } catch (e) {
            console.log(`⚠️ Subida a ${intento.nombre} falló: ${e.message}`);
        }
    }
    return null;
}

module.exports = {
    name: 'setmenu',
    alias: ['imagenmenu', 'menuimg', 'setimagen'],
    async execute(sock, msg, args, { chatId, downloadMediaMessage }) {
        const data = cargar();
        const esReset = args[0]?.toLowerCase() === 'reset' || args[0]?.toLowerCase() === 'borrar';

        // ✅ RESET: borrar la imagen global
        if (esReset) {
            if (data[GLOBAL_KEY]) {
                delete data[GLOBAL_KEY].menuImagen;
                delete data[GLOBAL_KEY].menuImagenUrl;
                if (Object.keys(data[GLOBAL_KEY]).length === 0) delete data[GLOBAL_KEY];
            }
            guardar(data);
            return await sock.sendMessage(chatId, {
                text: '🗑️ *Imagen del menú eliminada.*\n\n_Ahora el menú se mostrará solo con texto._'
            });
        }

        // Detectar si hay imagen (respondida o enviada directamente)
        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        const propio = msg.message.imageMessage;
        const media = propio ? msg.message : quoted;

        // Si no hay imagen, mostrar estado
        if (!media?.imageMessage) {
            const tieneImagen = !!data[GLOBAL_KEY]?.menuImagen;
            return await sock.sendMessage(chatId, {
                text: `🖼️ *SETMENU*\n\n` +
                      `📊 *Estado:* ${tieneImagen ? '✅ Imagen configurada' : '❌ Sin imagen'}\n\n` +
                      `*Cómo usar:*\n` +
                      `➺ Responde a una foto con ,setmenu o ,setimagen → guarda como imagen del menú (global)\n` +
                      `➺ ,setmenu reset → borra la imagen\n\n` +
                      `_La imagen se usa en TODOS los grupos y chats._`
            });
        }

        try {
            const buffer = await downloadMediaMessage(
                { message: media, key: msg.key },
                'buffer',
                {},
                { logger: sock.logger, reuploadRequest: sock.updateMediaMessage }
            );

            // ✅ Verificar tamaño (máx 2MB)
            const tamañoMB = buffer.length / 1024 / 1024;
            if (tamañoMB > 2) {
                return await sock.sendMessage(chatId, {
                    text: `⚠️ Imagen muy pesada (${tamañoMB.toFixed(2)} MB). Máximo 2 MB.`
                });
            }

            const base64 = buffer.toString('base64');
            const url = await subirImagen(buffer);

            if (!data[GLOBAL_KEY]) data[GLOBAL_KEY] = {};
            data[GLOBAL_KEY].menuImagen = base64;
            if (url) data[GLOBAL_KEY].menuImagenUrl = url;
            else delete data[GLOBAL_KEY].menuImagenUrl;
            guardar(data);

            await sock.sendMessage(chatId, {
                text: `✅ *Imagen del menú guardada.*\n\n` +
                      `⚡ Se aplicó al instante (sin reiniciar el bot).\n` +
                      (url
                          ? `🖼️ El menú se envía en un solo mensaje con la nueva imagen.\n`
                          : `⚠️ No se pudo subir la imagen; el menú usará la foto en un mensaje aparte.\n`) +
                      `🌍 Se usará automáticamente en TODOS los grupos y chats.\n` +
                      `📸 Tamaño: ${tamañoMB.toFixed(2)} MB\n\n` +
                      `_Prueba con_ ,menu _en cualquier grupo._`
            });
            console.log(`✅ Imagen del menú guardada (${tamañoMB.toFixed(2)} MB)${url ? ` -> ${url}` : ' (sin URL)'}`);
        } catch (error) {
            console.error('Error setmenu:', error.message);
            await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` });
        }
    }
};
