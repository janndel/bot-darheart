const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'scold',
  alias: ["regañar"],
  category: 'anime',
  desc: 'scold',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'scold', selfText: "está *regañando*", targetText: "*regañó* a", emoji: '😠' });
  }
};
