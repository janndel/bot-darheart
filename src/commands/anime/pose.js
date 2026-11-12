const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'pose',
  alias: ["posar"],
  category: 'anime',
  desc: 'pose',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'pose', selfText: "está *posando*", targetText: "posó para", emoji: '📸' });
  }
};
