const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'bonk',
  alias: ["golpe"],
  category: 'anime',
  desc: 'bonk',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'bonk', selfText: "dio un *bonk*", targetText: "le dio un *bonk* a", emoji: '🔨' });
  }
};
