const fs = require('fs');
const path = require('path');
const { prepareRichResponseMessage } = require('@mrzkyzdnii/baileys');

const HOME = process.env.HOME;
const NOMBRE_BOT = 'DARHEART';
const CONFIG_GRUPOS = path.join(HOME, 'config_grupos.json');
const MAX_TEXTO = 3500;

function leerImagenMenu() {
    try {
        const data = JSON.parse(fs.readFileSync(CONFIG_GRUPOS, 'utf8'));
        const base64 = data?.__global__?.menuImagen;
        if (!base64) return null;
        const buffer = Buffer.from(base64, 'base64');
        return buffer.length ? buffer : null;
    } catch (error) {
        return null;
    }
}

function leerImagenMenuUrl() {
    try {
        const data = JSON.parse(fs.readFileSync(CONFIG_GRUPOS, 'utf8'));
        const url = data?.__global__?.menuImagenUrl;
        return typeof url === 'string' && /^https?:\/\//i.test(url) ? url : null;
    } catch (error) {
        return null;
    }
}

function construirRichConImagen(rich, disclaimerText, footerText, imageUrl) {
    const wrapper = prepareRichResponseMessage({ disclaimerText, richResponse: rich, footerText });
    const richResponseMessage = wrapper?.botForwardedMessage?.message?.richResponseMessage;
    if (!richResponseMessage) return wrapper;

    richResponseMessage.submessages = [
        {
            messageType: 1,
            gridImageMetadata: {
                gridImageUrl: { imagePreviewUrl: imageUrl },
                imageUrls: [{
                    imagePreviewUrl: imageUrl,
                    imageHighResUrl: imageUrl,
                    sourceUrl: 'https://github.com/zeative/zaileys'
                }]
            }
        },
        ...(richResponseMessage.submessages || [])
    ];

    let unified;
    try {
        const raw = richResponseMessage.unifiedResponse?.data;
        const data = Buffer.isBuffer(raw) ? raw.toString('utf8') : Buffer.from(raw || '').toString('utf8');
        unified = JSON.parse(data);
    } catch (error) {
        unified = { sections: [] };
    }

    unified.sections = [
        {
            view_model: {
                primitive: {
                    media: { url: imageUrl, mime_type: 'image/jpeg' },
                    imagine_type: 'IMAGE',
                    status: { status: 'READY' },
                    __typename: 'GenAIImaginePrimitive'
                },
                __typename: 'GenAISingleLayoutViewModel'
            }
        },
        ...(unified.sections || [])
    ];

    richResponseMessage.unifiedResponse = { data: Buffer.from(JSON.stringify(unified)) };
    return wrapper;
}

function textoDesdeRich(rich) {
    return rich
        .filter(item => item.text || item.code)
        .map(item => item.code
            ? item.code.map(bloque => bloque.codeContent).join('\n')
            : item.text)
        .join('\n\n');
}

function dividirTexto(texto, maximo) {
    const partes = [];
    let actual = '';
    for (const linea of String(texto).split('\n')) {
        if (actual && (actual.length + linea.length + 1) > maximo) {
            partes.push(actual);
            actual = linea;
        } else {
            actual = actual ? `${actual}\n${linea}` : linea;
        }
    }
    if (actual) partes.push(actual);
    return partes;
}

async function enviarRich(sock, chatId, rich, opciones = {}) {
    const {
        disclaimerText = '',
        footerText = `${NOMBRE_BOT} — by JANNDEL`,
        imagen = null,
        imagenUrl = null,
        mentions = []
    } = opciones;
    const extra = mentions.length ? { mentions } : {};

    if (imagenUrl) {
        try {
            const wrapper = construirRichConImagen(rich, disclaimerText, footerText, imagenUrl);
            await sock.sendMessage(chatId, { ...wrapper, raw: true, ...extra });
            return;
        } catch (error) {
            console.log('⚠️ Rich con imagen inline no soportado, usando foto separada:', error.message);
        }
    }
    if (imagen) {
        try {
            await sock.sendMessage(chatId, { image: imagen });
        } catch (error) {
            console.log('⚠️ No se pudo enviar la foto:', error.message);
        }
    }
    try {
        await sock.sendMessage(chatId, {
            disclaimerText,
            richResponse: rich,
            footerText,
            ...extra
        });
    } catch (error) {
        console.log('⚠️ Rich no soportado, usando texto:', error.message);
        const plano = textoDesdeRich(rich);
        for (const parte of dividirTexto(plano, MAX_TEXTO)) {
            await sock.sendMessage(chatId, { text: parte, ...extra });
        }
    }
}

module.exports = {
    NOMBRE_BOT,
    leerImagenMenu,
    leerImagenMenuUrl,
    enviarRich,
    textoDesdeRich,
    dividirTexto
};
