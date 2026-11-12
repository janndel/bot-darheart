const axios = require('axios');

function pollinations(prompt) {
  const enc = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 1000000);
  return `https://image.pollinations.ai/prompt/${enc}?width=1024&height=1024&nologo=true&seed=${seed}`;
}

module.exports = {
  name: 'luz',
  alias: ['imggen', 'genimg', 'genimg2', 'ia'],
  category: 'general',
  desc: 'Genera/obtiene imágenes con un prompt',
  async execute(sock, msg, args, { chatId }) {
    const prompt = args.join(' ').trim();
    if (!prompt) return sock.sendMessage(chatId, { text: '⚠️ Uso: ,luz <descripción de la imagen>' });

    try {
      const url = `https://api.lolicon.app/setu/v2?r18=0&num=1&tag=${encodeURIComponent(prompt)}`;
      const res = await axios.get(url, {
        timeout: 20000,
        headers: { 'User-Agent': 'DarheartBot/1.0', Accept: 'application/json' }
      });
      const data = res.data?.data?.[0];
      const imageUrl = data?.urls?.original || data?.urls?.regular || data?.urls?.small;
      if (imageUrl) {
        const caption = `✨ *${data.title || prompt}*\n🎨 ${data.author || 'Desconocido'}`;
        try {
          await sock.sendMessage(chatId, { image: { url: imageUrl }, caption });
          return;
        } catch {}
      }
    } catch {}

    try {
      await sock.sendMessage(chatId, { image: { url: pollinations(prompt) }, caption: '🖼️ ' + prompt });
    } catch (e) {
      await sock.sendMessage(chatId, { text: `❌ Error: ${e.message}` });
    }
  }
};
