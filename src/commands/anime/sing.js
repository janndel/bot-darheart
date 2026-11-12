const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'sing',
  alias: ["cantar"],
  category: 'anime',
  desc: 'sing',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'sing', selfText: "está *cantando*", targetText: "*cantó* para", emoji: '🎤' });
  }
};
