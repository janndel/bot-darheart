const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'bite',
  alias: ["morder"],
  category: 'anime',
  desc: 'bite',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'bite', selfText: "*mordió*", targetText: "*mordió* a", emoji: '😼' });
  }
};
