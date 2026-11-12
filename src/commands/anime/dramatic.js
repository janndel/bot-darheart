const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'dramatic',
  alias: ["drama"],
  category: 'anime',
  desc: 'dramatic',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'dramatic', selfText: "está *dramático/a*", targetText: "hizo *drama* con", emoji: '🎭' });
  }
};
