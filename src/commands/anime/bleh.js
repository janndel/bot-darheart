const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'bleh',
  alias: ["meh"],
  category: 'anime',
  desc: 'bleh',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'bleh', selfText: "hizo *bleh*", targetText: "le hizo *bleh* a", emoji: '😝' });
  }
};
