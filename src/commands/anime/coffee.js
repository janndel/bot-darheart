const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'coffee',
  alias: ["cafe"],
  category: 'anime',
  desc: 'coffee',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'coffee', selfText: "toma *café*", targetText: "tomó *café* con", emoji: '☕' });
  }
};
