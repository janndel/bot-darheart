const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const WebP = require('node-webpmux');

const PACK_FILE = path.join(process.env.HOME, 'packname.json');

function cargarPack() {
    try {
        const data = JSON.parse(fs.readFileSync(PACK_FILE, 'utf8'));
        return {
            nombre: data?.nombre || 'DARHEART',
            autor: data?.autor || 'JANNDEL'
        };
    } catch {
        return { nombre: 'DARHEART', autor: 'JANNDEL' };
    }
}

async function addMetadata(webpPath, packName, author) {
    try {
        const img = new WebP.Image();
        await img.load(webpPath);

        const json = {
            "sticker-pack-id": "com.darheart.stickers",
            "sticker-pack-name": packName,
            "sticker-pack-publisher": author,
            "emojis": ["🤖", "🏴‍☠️"]
        };

        const exifAttr = Buffer.from([
            0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
            0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00
        ]);

        const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
        const exif = Buffer.concat([exifAttr, jsonBuffer]);
        exif.writeUIntLE(jsonBuffer.length, 14, 4);

        img.exif = exif;
        await img.save(webpPath);
        return true;
    } catch (e) {
        console.error('Error añadiendo metadata:', e.message);
        return false;
    }
}

module.exports = {
    name: 'sticker',
    alias: ['s', 'stiker'],
    async execute(sock, msg, args, { chatId, downloadMediaMessage }) {
        const ctx = msg.message?.extendedTextMessage?.contextInfo;
        const quoted = ctx?.quotedMessage;
        const propio = msg.message?.imageMessage || msg.message?.videoMessage || msg.message?.stickerMessage;
        const media = quoted || (propio ? msg.message : null);
        const tipo = media?.stickerMessage ? 'sticker'
            : media?.imageMessage ? 'image'
            : media?.videoMessage ? 'video'
            : null;

        if (!tipo) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Responde a una imagen, video o sticker con el comando.'
            });
        }

        const tmpDir = os.tmpdir();
        const stamp = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const inputPath = path.join(tmpDir, `in_${stamp}`);
        const outputPath = path.join(tmpDir, `out_${stamp}.webp`);
        const packData = cargarPack();

        try {
            const key = ctx?.stanzaId ? { ...msg.key, id: ctx.stanzaId } : msg.key;
            if (ctx?.participant) key.participant = ctx.participant;

            const buffer = await downloadMediaMessage(
                { message: media, key },
                'buffer',
                {},
                { logger: sock.logger, reuploadRequest: sock.updateMediaMessage }
            );

            if (tipo === 'sticker') {
                fs.writeFileSync(outputPath, buffer);
            } else {
                fs.writeFileSync(inputPath, buffer);

                const filtro = `scale=512:512:force_original_aspect_ratio=increase,` +
                               `crop=512:512,setsar=1,format=yuva420p`;

                const cmd = tipo === 'video'
                    ? `ffmpeg -i "${inputPath}" -t 3 ` +
                      `-vf "${filtro},fps=15" ` +
                      `-c:v libwebp_anim -lossless 0 -q:v 75 -loop 0 -an -fps_mode passthrough ` +
                      `-pix_fmt yuva420p "${outputPath}" -y`
                    : `ffmpeg -i "${inputPath}" ` +
                      `-vf "${filtro}" ` +
                      `-c:v libwebp -lossless 0 -q:v 80 ` +
                      `-pix_fmt yuva420p "${outputPath}" -y`;

                console.log(`🎨 Creando sticker (pack: ${packData.nombre} | ${packData.autor})...`);
                await new Promise((resolve, reject) => {
                    exec(cmd, { timeout: 60000 }, (error, stderr) => {
                        if (error) {
                            console.error('FFmpeg error:', stderr);
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            }

            console.log(`🏷️ Añadiendo firma (${packData.nombre} | ${packData.autor})...`);
            await addMetadata(outputPath, packData.nombre, packData.autor);

            const stickerBuffer = fs.readFileSync(outputPath);
            await sock.sendMessage(chatId, { sticker: stickerBuffer });
            console.log('✅ Sticker enviado con firma');
        } catch (error) {
            console.error('Error creando sticker:', error.message);
            await sock.sendMessage(chatId, { text: '❌ No se pudo crear el sticker.' });
        } finally {
            for (const p of [inputPath, outputPath]) {
                try { if (fs.existsSync(p)) fs.unlinkSync(p); } catch (e) {}
            }
        }
    }
};
