const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'celebrate',
  alias: ["celebrar"],
  category: 'anime',
  desc: 'celebrate',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'celebrate', selfText: "está *celebrando*", targetText: "*celebró* con", emoji: '🎉' });
  }
};
