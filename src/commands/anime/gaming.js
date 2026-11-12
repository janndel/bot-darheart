const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'gaming',
  alias: ["jugar"],
  category: 'anime',
  desc: 'gaming',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'gaming', selfText: "está *jugando*", targetText: "*jugó* con", emoji: '🎮' });
  }
};
