const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'bath',
  alias: ["bañarse"],
  category: 'anime',
  desc: 'bath',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'bath', selfText: "se está *bañando*", targetText: "se bañó con", emoji: '🛁' });
  }
};
