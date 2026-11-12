const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'lickass',
  alias: [],
  category: 'nsfw',
  desc: 'lickass',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'lickass', selfText: "hizo *lickass*", targetText: "le lamió a", emoji: '👅' });
  }
};
