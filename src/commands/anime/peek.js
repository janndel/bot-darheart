const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'peek',
  alias: [],
  category: 'anime',
  desc: 'peek',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'peek', selfText: "está *espiando*", targetText: "*espiando* a", emoji: '👀' });
  }
};
