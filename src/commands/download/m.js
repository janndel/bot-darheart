const fs = require('fs');
const path = require('path');
const os = require('os');
const { descargarAudio } = require('../../lib/ytdlp');

const esTermux = fs.existsSync('/data/data/com.termux/files/usr');
const LIMITE_AUDIO = 16 * 1024 * 1024;

module.exports = {
    name: 'm',
    alias: ['buscar', 'cancion', 'song', 'music'],
    category: 'descargas',
    desc: 'Buscar y descargar música de YouTube',
    timeout: 600000,
    async execute(sock, msg, args, { chatId }) {
        const busqueda = args.join(' ').trim();
        if (!busqueda) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Escribe el nombre de la canción.\nEjemplo: ,m Bad Bunny Monaco'
            });
        }

        await sock.sendMessage(chatId, { text: `🔍 Buscando: *${busqueda}*...` });

        try {
            const { buffer, titulo, tamanoMB } = await descargarAudio(busqueda, 240000);
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
                    console.log('✅ Enviado como audio');
                    return;
                } catch (e) {
                    console.log('⚠️ Envío como audio falló:', e.message);
                }
            }

            try {
                await sock.sendMessage(chatId, {
                    document: buffer,
                    mimetype: 'audio/mp4',
                    fileName: nombre,
                    caption: `🎵 *${titulo}*\n🎧 ${tamanoMB} MB`
                });
                console.log('✅ Enviado como documento');
                return;
            } catch (e) {
                console.log('⚠️ Envío como documento falló:', e.message);
            }

            if (esTermux) {
                const musicDir = path.join(os.homedir(), 'storage', 'music');
                fs.mkdirSync(musicDir, { recursive: true });
                const fileName = `m_${Date.now()}.m4a`;
                fs.writeFileSync(path.join(musicDir, fileName), buffer);
                await sock.sendMessage(chatId, {
                    text: `✅ *${titulo}*\n\n📁 Guardado en tu música\n🎧 ${tamanoMB} MB`
                });
            } else {
                await sock.sendMessage(chatId, { text: '❌ No se pudo enviar el audio.' });
            }

        } catch (error) {
            console.error('Error m:', error.message);
            await sock.sendMessage(chatId, { text: `❌ ${error.message}` });
        }
    }
};
