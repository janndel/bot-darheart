const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'deepthroat',
  alias: [],
  category: 'nsfw',
  desc: 'deepthroat',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'deepthroat', selfText: "hizo *deepthroat*", targetText: "le hizo *deepthroat* a", emoji: '😈' });
  }
};
