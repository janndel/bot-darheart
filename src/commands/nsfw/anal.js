const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'anal',
  alias: [],
  category: 'nsfw',
  desc: 'anal',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'anal', selfText: "hizo *anal*", targetText: "le hizo *anal* a", emoji: '🍑' });
  }
};
