const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'thinkhard',
  alias: [],
  category: 'anime',
  desc: 'thinkhard',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'thinkhard', selfText: "piensa *mucho*", targetText: "piensa mucho en", emoji: '🧠' });
  }
};
