const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'sharefood',
  alias: ["compartir"],
  category: 'anime',
  desc: 'sharefood',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'sharefood', selfText: "compartió comida", targetText: "compartió comida con", emoji: '🍱' });
  }
};
