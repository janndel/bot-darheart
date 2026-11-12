const fs = require('fs');
const path = require('path');

const STICKER_DIR = path.join(process.env.HOME, 'stickers_random');
if (!fs.existsSync(STICKER_DIR)) fs.mkdirSync(STICKER_DIR, { recursive: true });

module.exports = {
    name: 'random',
    alias: ['stikrandom', 'randsticker'],
    async execute(sock, msg, args, { chatId }) {
        try {
            const archivos = fs.readdirSync(STICKER_DIR).filter(f => f.endsWith('.webp'));
            
            if (archivos.length === 0) {
                return await sock.sendMessage(chatId, {
                    text: `📭 No hay stickers en la carpeta.\n\n` +
                          `_Guarda archivos .webp en:_\n${STICKER_DIR}`
                });
            }

            const elegido = archivos[Math.floor(Math.random() * archivos.length)];
            const rutaCompleta = path.join(STICKER_DIR, elegido);
            const buffer = fs.readFileSync(rutaCompleta);

            await sock.sendMessage(chatId, { sticker: buffer });
            console.log(`🎲 Sticker aleatorio: ${elegido}`);
        } catch (error) {
            console.error('Error random:', error.message);
            await sock.sendMessage(chatId, { text: '❌ Error enviando sticker.' });
        }
    }
};
