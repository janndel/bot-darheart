const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'piggyback',
  alias: ["cargar"],
  category: 'anime',
  desc: 'piggyback',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'piggyback', selfText: "cargó", targetText: "cargó a", emoji: '🏋️' });
  }
};
