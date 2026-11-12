const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'cumshot',
  alias: [],
  category: 'nsfw',
  desc: 'cumshot',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'cumshot', selfText: "hizo *cumshot*", targetText: "le hizo *cumshot* a", emoji: '💦' });
  }
};
