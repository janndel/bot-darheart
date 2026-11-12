const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'greet',
  alias: ["hi"],
  category: 'anime',
  desc: 'greet',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'greet', selfText: "saluda", targetText: "saludó a", emoji: '👋' });
  }
};
