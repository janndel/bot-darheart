const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'spin',
  alias: ["girar"],
  category: 'anime',
  desc: 'spin',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'spin', selfText: "está *girando*", targetText: "giró con", emoji: '🌀' });
  }
};
