const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'kisshead',
  alias: [],
  category: 'anime',
  desc: 'kisshead',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'kisshead', selfText: "dio un beso en la frente", targetText: "besó la frente de", emoji: '💋' });
  }
};
