const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'laugh',
  alias: ["reír"],
  category: 'anime',
  desc: 'laugh',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'laugh', selfText: "se está *riendo*", targetText: "se *rió* de", emoji: '😂' });
  }
};
