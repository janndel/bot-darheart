const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'pegging',
  alias: [],
  category: 'nsfw',
  desc: 'pegging',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'pegging', selfText: "hizo *pegging*", targetText: "le hizo *pegging* a", emoji: '😈' });
  }
};
