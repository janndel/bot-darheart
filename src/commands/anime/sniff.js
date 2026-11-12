const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'sniff',
  alias: ["oler"],
  category: 'anime',
  desc: 'sniff',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'sniff', selfText: "está *olfateando*", targetText: "*olió* a", emoji: '👃' });
  }
};
