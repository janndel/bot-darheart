const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = {
    name: 'imagen',
    alias: ['generarimagen', 'genimg', 'ia', 'img', 'image'],
    category: 'general',
    desc: 'Genera una imagen a partir de un prompt usando IA (gratis)',
    async execute(sock, msg, args, { chatId }) {
        const prompt = args.join(' ').trim();
        if (!prompt) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Escribe un prompt.\nEjemplo: ,imagen un paisaje montañoso al atardecer'
            });
        }

        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&model=flux`;

        try {
            await sock.sendMessage(chatId, {
                image: { url },
                caption: `🎨 *Imagen generada*\n\n_Contenido:_ ${prompt}`
            });
            console.log('✅ Imagen generada');
        } catch (error) {
            console.error('Error imagen:', error.message);
            try {
                const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 60000, maxContentLength: 15 * 1024 * 1024 });
                const buffer = Buffer.from(res.data);
                await sock.sendMessage(chatId, {
                    image: buffer,
                    caption: `🎨 *Imagen generada*\n\n_Contenido:_ ${prompt}`
                });
            } catch (e2) {
                await sock.sendMessage(chatId, { text: `❌ Error: ${e2.message}` });
            }
        }
    }
};
