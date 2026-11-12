const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'fistbump',
  alias: [],
  category: 'anime',
  desc: 'fistbump',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'fistbump', selfText: "hizo *fistbump*", targetText: "chocó puños con", emoji: '👊' });
  }
};
