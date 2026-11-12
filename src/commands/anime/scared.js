const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'scared',
  alias: ["asustado","asustada"],
  category: 'anime',
  desc: 'scared',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'scared', selfText: "está *asustado/a*", targetText: "se asustó de", emoji: '😨' });
  }
};
