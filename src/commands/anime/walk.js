const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'walk',
  alias: ["caminar"],
  category: 'anime',
  desc: 'walk',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'walk', selfText: "está *caminando*", targetText: "caminó con", emoji: '🚶' });
  }
};
