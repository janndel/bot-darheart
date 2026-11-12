const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'smoke',
  alias: ["fumar"],
  category: 'anime',
  desc: 'smoke',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'smoke', selfText: "está *fumando*", targetText: "fumó con", emoji: '🚬' });
  }
};
