const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'grope',
  alias: [],
  category: 'nsfw',
  desc: 'grope',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'grope', selfText: "hizo *grope*", targetText: "manoseó a", emoji: '😈' });
  }
};
