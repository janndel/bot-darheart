const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'cummouth',
  alias: [],
  category: 'nsfw',
  desc: 'cummouth',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'cummouth', selfText: "hizo *cummouth*", targetText: "le hizo *cummouth* a", emoji: '💦' });
  }
};
