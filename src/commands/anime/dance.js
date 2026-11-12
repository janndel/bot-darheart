const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'dance',
  alias: ["bailar"],
  category: 'anime',
  desc: 'dance',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'dance', selfText: "está *bailando*", targetText: "*bailó* con", emoji: '💃' });
  }
};
