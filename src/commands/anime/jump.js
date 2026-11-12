const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'jump',
  alias: ["saltar"],
  category: 'anime',
  desc: 'jump',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'jump', selfText: "está *saltando*", targetText: "*saltó* con", emoji: '🦘' });
  }
};
