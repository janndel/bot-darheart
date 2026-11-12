const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'wave',
  alias: ["saludar"],
  category: 'anime',
  desc: 'wave',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'wave', selfText: "está *saludando*", targetText: "saludó a", emoji: '👋' });
  }
};
