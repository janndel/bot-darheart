const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'yawn',
  alias: ["bostezar"],
  category: 'anime',
  desc: 'yawn',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'yawn', selfText: "está *bostezando*", targetText: "bostezó con", emoji: '🥱' });
  }
};
