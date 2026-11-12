const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'lickdick',
  alias: [],
  category: 'nsfw',
  desc: 'lickdick',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'lickdick', selfText: "hizo *lickdick*", targetText: "le lamió a", emoji: '👅' });
  }
};
