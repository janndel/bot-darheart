const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'push',
  alias: ["empujar"],
  category: 'anime',
  desc: 'push',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'push', selfText: "*empujó*", targetText: "*empujó* a", emoji: '🫸' });
  }
};
