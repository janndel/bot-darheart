const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'fap',
  alias: ["paja"],
  category: 'nsfw',
  desc: 'fap',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'fap', selfText: "se hizo una *paja*", targetText: "le hizo *fap* a", emoji: '😈' });
  }
};
