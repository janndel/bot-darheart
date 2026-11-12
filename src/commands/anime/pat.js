const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'pat',
  alias: ["acariciar"],
  category: 'anime',
  desc: 'pat',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'pat', selfText: "hizo *pat*", targetText: "*acarició* a", emoji: '🫳' });
  }
};
