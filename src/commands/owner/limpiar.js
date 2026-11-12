const fs = require('fs');
const path = require('path');
const os = require('os');

const OWNERS = ['75501934751805', '584164659101', '584162662671'];

module.exports = {
    name: 'limpiar',
    alias: ['clean', 'cleanup', 'limpieza'],
    async execute(sock, msg, args, { chatId }) {
        const sender = (msg.key.participant || msg.key.remoteJid || chatId).split('@')[0].split(':')[0];
        if (!OWNERS.includes(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Acceso denegado.' });
        }

        const tmpDir = os.tmpdir();
        const patrones = ['in_', 'out_', 'song_', 'attp_', 'ttp_', 'brat_', 'tt_', 'ig_', 'fb_', 'x_', 'vid_'];

        let eliminados = 0;
        let tamañoLiberado = 0;

        try {
            const archivos = fs.readdirSync(tmpDir);
            for (const archivo of archivos) {
                if (patrones.some(p => archivo.startsWith(p))) {
                    const ruta = path.join(tmpDir, archivo);
                    try {
                        const stat = fs.statSync(ruta);
                        tamañoLiberado += stat.size;
                        fs.unlinkSync(ruta);
                        eliminados++;
                    } catch (e) {}
                }
            }
        } catch (e) {
            console.error('Error limpiando:', e.message);
        }

        const mbLiberado = (tamañoLiberado / 1024 / 1024).toFixed(2);

        await sock.sendMessage(chatId, {
            text: `🧹 *Limpieza completada*\n\n` +
                  `🗑️ Archivos eliminados: *${eliminados}*\n` +
                  `💾 Espacio liberado: *${mbLiberado} MB*`
        });
        console.log(`🧹 Limpieza: ${eliminados} archivos, ${mbLiberado} MB`);
    }
};
