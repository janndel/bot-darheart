const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'boop',
  alias: ["naricita"],
  category: 'anime',
  desc: 'boop',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'boop', selfText: "hizo *boop*", targetText: "le hizo *boop* a", emoji: '👉' });
  }
};
