const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'footjob',
  alias: [],
  category: 'nsfw',
  desc: 'footjob',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'footjob', selfText: "hizo *footjob*", targetText: "le hizo *footjob* a", emoji: '🦶' });
  }
};
