const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'lickpussy',
  alias: [],
  category: 'nsfw',
  desc: 'lickpussy',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'lickpussy', selfText: "hizo *lickpussy*", targetText: "le lamió a", emoji: '👅' });
  }
};
