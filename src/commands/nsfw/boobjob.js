const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'boobjob',
  alias: [],
  category: 'nsfw',
  desc: 'boobjob',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'boobjob', selfText: "hizo *boobjob*", targetText: "le hizo *boobjob* a", emoji: '😈' });
  }
};
