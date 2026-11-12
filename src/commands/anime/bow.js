const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'bow',
  alias: ["reverencia"],
  category: 'anime',
  desc: 'bow',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'bow', selfText: "hizo una *reverencia*", targetText: "le hizo una *reverencia* a", emoji: '🙇' });
  }
};
