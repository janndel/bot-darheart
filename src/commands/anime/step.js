const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'step',
  alias: ["pisar"],
  category: 'anime',
  desc: 'step',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'step', selfText: "*pisó*", targetText: "pisó a", emoji: '👣' });
  }
};
