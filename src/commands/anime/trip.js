const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'trip',
  alias: ["tropezar"],
  category: 'anime',
  desc: 'trip',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'trip', selfText: "se *tropezó*", targetText: "tropezó con", emoji: '🤕' });
  }
};
