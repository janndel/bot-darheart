const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'lewd',
  alias: [],
  category: 'anime',
  desc: 'lewd',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'lewd', selfText: "se puso *lewd*", targetText: "se puso *lewd* con", emoji: '😳' });
  }
};
