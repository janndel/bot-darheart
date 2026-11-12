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
            "emojis": ["🖤"]
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
    } catch (e) {}
}

module.exports = {
    name: 'menubrat',
    alias: ['brat', 'bratsticker'],
    async execute(sock, msg, args, { chatId }) {
        if (args.length === 0) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Escribe el texto del sticker.\nEjemplo: ,menubrat Hola mundo'
            });
        }

        const texto = args.join(' ');
        const tmpDir = os.tmpdir();
        const txtFile = path.join(tmpDir, `brat_${Date.now()}.txt`);
        const outFile = path.join(tmpDir, `brat_${Date.now()}.webp`);

        try {
            fs.writeFileSync(txtFile, texto);

            // ✅ Genera imagen blanca con texto negro estilo brat
            // Usamos ffmpeg + drawtext
            const cmd = `ffmpeg -f lavfi -i "color=white:s=512x512" ` +
                        `-vf "drawtext=textfile='${txtFile}':fontcolor=black:fontsize=70:` +
                        `x=(w-text_w)/2:y=(h-text_h)/2:font=sans:line_spacing=10" ` +
                        `-frames:v 1 "${outFile}" -y`;

            await new Promise((resolve, reject) => {
                exec(cmd, { timeout: 30000 }, (err, stdout, stderr) => {
                    if (err) {
                        console.error('ffmpeg error:', stderr);
                        reject(err);
                    } else resolve();
                });
            });

            if (!fs.existsSync(outFile)) throw new Error('No se generó el sticker');

            const packData = cargarPack();
            await addMetadata(outFile, packData.nombre, packData.autor);
            const buffer = fs.readFileSync(outFile);
            await sock.sendMessage(chatId, { sticker: buffer });

            fs.unlinkSync(txtFile);
            fs.unlinkSync(outFile);
            console.log('✅ Brat sticker enviado');
        } catch (error) {
            console.error('Error menubrat:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
            try { if (fs.existsSync(txtFile)) fs.unlinkSync(txtFile); } catch(e){}
            try { if (fs.existsSync(outFile)) fs.unlinkSync(outFile); } catch(e){}
        }
    }
};
