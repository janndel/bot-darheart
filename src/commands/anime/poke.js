const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'poke',
  alias: ["picar"],
  category: 'anime',
  desc: 'poke',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'poke', selfText: "hizo *poke*", targetText: "*picó* a", emoji: '👉' });
  }
};
