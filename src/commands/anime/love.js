const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'love',
  alias: ["amor"],
  category: 'anime',
  desc: 'love',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'love', selfText: "siente *amor*", targetText: "ama a", emoji: '❤️' });
  }
};
