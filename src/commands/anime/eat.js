const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'eat',
  alias: ["nom","comer"],
  category: 'anime',
  desc: 'eat',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'eat', selfText: "está *comiendo*", targetText: "*comió* con", emoji: '🍽️' });
  }
};
