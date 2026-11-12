const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'apologize',
  alias: ["disculpar","perdon"],
  category: 'anime',
  desc: 'apologize',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'apologize', selfText: "pide *perdón*", targetText: "le pidió *perdón* a", emoji: '🙏' });
  }
};
