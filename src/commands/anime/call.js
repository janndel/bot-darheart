const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'call',
  alias: ["llamar"],
  category: 'anime',
  desc: 'call',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'call', selfText: "está *llamando*", targetText: "*llamó* a", emoji: '📞' });
  }
};
