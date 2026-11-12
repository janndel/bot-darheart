const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'cuddle',
  alias: ["acurrucarse"],
  category: 'anime',
  desc: 'cuddle',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'cuddle', selfText: "se *acurruca*", targetText: "se *acurrucó* con", emoji: '🫂' });
  }
};
