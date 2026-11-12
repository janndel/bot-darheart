const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'cry',
  alias: ["llorar"],
  category: 'anime',
  desc: 'cry',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'cry', selfText: "está *llorando*", targetText: "*lloró* por", emoji: '😢' });
  }
};
