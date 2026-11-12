const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'smile',
  alias: ["sonreir"],
  category: 'anime',
  desc: 'smile',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'smile', selfText: "está *sonriendo*", targetText: "le sonrió a", emoji: '😊' });
  }
};
