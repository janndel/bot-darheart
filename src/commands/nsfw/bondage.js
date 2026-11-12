const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'bondage',
  alias: [],
  category: 'nsfw',
  desc: 'bondage',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'bondage', selfText: "hizo *bondage*", targetText: "le hizo *bondage* a", emoji: '⛓️' });
  }
};
