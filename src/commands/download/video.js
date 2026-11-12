const fs = require('fs');
const { descargarVideoArchivo } = require('../../lib/ytdlp');
const { ejecutarEnCola } = require('../../lib/media-queue');
const { guardarArchivoEnGaleria, formatearBytes } = require('../../lib/storage');

module.exports = {
    name: 'video',
    alias: ['ytmp4', 'ytv', 'play2', 'mp4', 'ytvideo', 'playvideo'],
    category: 'descargas',
    desc: 'Busca y descarga video de YouTube',
    timeout: 1800000,
    async execute(sock, msg, args, { chatId }) {
        const entrada = args.join(' ').trim();
        if (!entrada) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Envía un enlace de YouTube o el nombre de un video.\nEjemplo: ,video https://youtu.be/xxxxx'
            });
        }

        await sock.sendMessage(chatId, { text: '⏳ Preparando descarga de video...' });
        let ultimo = 0;
        const data = await ejecutarEnCola(sock, chatId, {
            tipo: 'video',
            entrada,
            timeoutMs: 1800000
        }, async ({ job }) => descargarVideoArchivo(entrada, 1800000, {
            job,
            onProgress: async (pct) => {
                if (pct < 25 || pct - ultimo < 25 || pct >= 100) return;
                ultimo = pct;
                await sock.sendMessage(chatId, { text: `📥 Video: ${pct}%` }).catch(() => {});
            }
        }));

        if (!data) return;

        try {
            const { ruta, size, titulo } = data;
            const caption = `✅ *${titulo}*\n📹 ${formatearBytes(size)}\n\n_DARHEART Bot_`;

            if (size <= 64 * 1024 * 1024) {
                try {
                    const buffer = fs.readFileSync(ruta);
                    await sock.sendMessage(chatId, {
                        video: buffer,
                        mimetype: 'video/mp4',
                        caption
                    });
                    return;
                } catch (e) {
                    console.log('⚠️ WhatsApp falló, guardando en galería...');
                }
            }

            const nombre = `video_${Date.now()}.mp4`;
            const guardado = await guardarArchivoEnGaleria(ruta, nombre, 'movies');
            await sock.sendMessage(chatId, {
                text: `✅ *Video guardado en tu galería*\n📁 ${guardado.split('/').pop()}\n📹 ${formatearBytes(size)}`
            });
        } catch (error) {
            console.error('Error video:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        } finally {
            try { fs.rmSync(data.dir, { recursive: true, force: true }); } catch (e) {}
        }
    }
};
