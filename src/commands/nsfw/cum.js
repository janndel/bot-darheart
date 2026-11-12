const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'cum',
  alias: [],
  category: 'nsfw',
  desc: 'cum',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'cum', selfText: "está en modo *cum*", targetText: "le hizo *cum* a", emoji: '💦' });
  }
};
