const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'scream',
  alias: ["gritar"],
  category: 'anime',
  desc: 'scream',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'scream', selfText: "está *gritando*", targetText: "le *gritó* a", emoji: '😱' });
  }
};
