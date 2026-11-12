const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'spank',
  alias: ["nalgada"],
  category: 'nsfw',
  desc: 'spank',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'spank', selfText: "dio una *nalgada*", targetText: "le dio una *nalgada* a", emoji: '🍑' });
  }
};
