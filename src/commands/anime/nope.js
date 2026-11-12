const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'nope',
  alias: ["nop"],
  category: 'anime',
  desc: 'nope',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'nope', selfText: "dijo *nope*", targetText: "le dijo *nope* a", emoji: '🙅' });
  }
};
