const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'highfive',
  alias: ["chocar"],
  category: 'anime',
  desc: 'highfive',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'highfive', selfText: "dio un *highfive*", targetText: "chocó los cinco con", emoji: '✋' });
  }
};
