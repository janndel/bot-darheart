const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'cook',
  alias: ["cocinar"],
  category: 'anime',
  desc: 'cook',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'cook', selfText: "está *cocinando*", targetText: "*cocinó* para", emoji: '🍳' });
  }
};
