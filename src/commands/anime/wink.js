const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'wink',
  alias: ["guiñar"],
  category: 'anime',
  desc: 'wink',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'wink', selfText: "hizo un *guiño*", targetText: "le guiñó a", emoji: '😉' });
  }
};
