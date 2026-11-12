const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'comfort',
  alias: ["consolar"],
  category: 'anime',
  desc: 'comfort',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'comfort', selfText: "da *consuelo*", targetText: "*consoló* a", emoji: '🤗' });
  }
};
