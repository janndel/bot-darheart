const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'think',
  alias: ["pensar"],
  category: 'anime',
  desc: 'think',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'think', selfText: "está *pensando*", targetText: "piensa en", emoji: '🤔' });
  }
};
