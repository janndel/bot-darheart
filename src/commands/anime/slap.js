const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'slap',
  alias: ["bofetada"],
  category: 'anime',
  desc: 'slap',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'slap', selfText: "dio una *bofetada*", targetText: "abofeteó a", emoji: '🖐️' });
  }
};
