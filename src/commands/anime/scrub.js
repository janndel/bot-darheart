const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'scrub',
  alias: ["fregar"],
  category: 'anime',
  desc: 'scrub',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'scrub', selfText: "está *fregando*", targetText: "*fregó* a", emoji: '🧽' });
  }
};
