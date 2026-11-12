const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'blush',
  alias: ["sonrojarse"],
  category: 'anime',
  desc: 'blush',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'blush', selfText: "se *sonrojó*", targetText: "se *sonrojó* por", emoji: '😊' });
  }
};
