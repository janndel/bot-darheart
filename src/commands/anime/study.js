const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'study',
  alias: ["estudiar"],
  category: 'anime',
  desc: 'study',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'study', selfText: "está *estudiando*", targetText: "estudió con", emoji: '📚' });
  }
};
