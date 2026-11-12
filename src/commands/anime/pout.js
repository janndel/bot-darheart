const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'pout',
  alias: ["mueca"],
  category: 'anime',
  desc: 'pout',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'pout', selfText: "hizo *puchero*", targetText: "le hizo *puchero* a", emoji: '😤' });
  }
};
