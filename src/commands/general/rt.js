const axios = require('axios');

module.exports = {
    name: 'rt',
    alias: ['anime', 'lolicon', 'setu'],
    category: 'general',
    desc: 'Obtén una imagen aleatoria de anime (gratis, sin API key)',
    async execute(sock, msg, args, { chatId }) {
        const r18 = args.some(a => a.toLowerCase() === 'r18' || a.toLowerCase() === '+18');
        const url = `https://api.lolicon.app/setu/v2?r18=${r18 ? 1 : 0}`;

        try {
            const res = await axios.get(url, { timeout: 30000 });
            const data = res.data?.data?.[0];
            if (!data) throw new Error('No se recibió imagen');

            const imageUrl = data.urls?.original;
            const titulo = data.title || 'Imagen anime';
            const autor = data.author || 'Desconocido';
            const r18Label = data.r18 ? '🔞 +18' : '🟢 Seguro';

            await sock.sendMessage(chatId, {
                image: { url: imageUrl },
                caption: `🖼️ *Anime aleatorio*\n\nTítulo: ${titulo}\nAutor: ${autor}\nClasificación: ${r18Label}`
            });
            console.log('✅ Imagen anime enviada');
        } catch (error) {
            console.error('Error rt:', error.message);
            await sock.sendMessage(chatId, { text: `❌ Error: ${error.message}` });
        }
    }
};
