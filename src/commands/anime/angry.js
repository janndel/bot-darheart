const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'angry',
  alias: ["enojado","enojada"],
  category: 'anime',
  desc: 'angry',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'angry', selfText: "está *enojado/a*", targetText: "está *enojado/a* con", emoji: '😠' });
  }
};
