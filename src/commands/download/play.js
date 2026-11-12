const fs = require('fs');
const path = require('path');
const os = require('os');
const { descargarAudio } = require('../../lib/ytdlp');
const { ejecutarEnCola } = require('../../lib/media-queue');

const LIMITE_AUDIO = 15 * 1024 * 1024;

module.exports = {
    name: 'play',
    alias: ['musica', 'ytmp3', 'audio', 'mp3', 'ytaudio', 'playaudio'],
    category: 'descargas',
    desc: 'Busca y descarga audio de YouTube',
    timeout: 600000,
    async execute(sock, msg, args, { chatId }) {
        const entrada = args.join(' ').trim();
        if (!entrada) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Envía un enlace de YouTube o el nombre de una canción.\nEjemplo: ,play bad bunny monaco'
            });
        }

        await sock.sendMessage(chatId, { text: `🔍 Buscando: *${entrada}*...` });
        let ultimo = 0;
        const data = await ejecutarEnCola(sock, chatId, {
            tipo: 'audio',
            entrada,
            timeoutMs: 600000
        }, async ({ job }) => descargarAudio(entrada, 600000, {
            job,
            onProgress: async (pct) => {
                if (pct < 25 || pct - ultimo < 25 || pct >= 100) return;
                ultimo = pct;
                await sock.sendMessage(chatId, { text: `📥 Audio: ${pct}%` }).catch(() => {});
            }
        }));

        if (!data) return;

        try {
            const { buffer, titulo, tamanoMB } = data;
            const nombre = `${titulo.replace(/[\\/:*?"<>|]/g, '').slice(0, 80) || 'audio'}.m4a`;
            console.log(`🎵 Descargado: ${titulo} (${tamanoMB} MB)`);

            if (buffer.length <= LIMITE_AUDIO) {
                try {
                    await sock.sendMessage(chatId, {
                        audio: buffer,
                        mimetype: 'audio/mp4',
                        ptt: false,
                        fileName: nombre,
                        caption: `🎵 *${titulo}*`
                    });
                    return;
                } catch (e) {
                    console.log('⚠️ Envío como audio falló:', e.message);
                }
            }

            return await sock.sendMessage(chatId, { text: `⚠️ El archivo supera el límite de 15 MB para ahorrar datos del servidor.` });

            const musicDir = path.join(os.homedir(), 'storage', 'music');
            fs.mkdirSync(musicDir, { recursive: true });
            const fileName = `audio_${Date.now()}.m4a`;
            fs.writeFileSync(path.join(musicDir, fileName), buffer);
            await sock.sendMessage(chatId, {
                text: `✅ *${titulo}*\n\n📁 Guardado en tu música\n🎧 ${tamanoMB} MB`
            });
        } catch (error) {
            console.error('Error play:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
