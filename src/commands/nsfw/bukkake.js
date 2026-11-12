const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'bukkake',
  alias: [],
  category: 'nsfw',
  desc: 'bukkake',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'bukkake', selfText: "hizo *bukkake*", targetText: "le hizo *bukkake* a", emoji: '💦' });
  }
};
