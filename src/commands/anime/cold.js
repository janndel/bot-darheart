const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'cold',
  alias: [],
  category: 'anime',
  desc: 'cold',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'cold', selfText: "tiene *frío*", targetText: "tiene *frío* con", emoji: '🥶' });
  }
};
