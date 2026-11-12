const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'draw',
  alias: ["dibujar"],
  category: 'anime',
  desc: 'draw',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'draw', selfText: "está *dibujando*", targetText: "*dibujó* a", emoji: '🎨' });
  }
};
