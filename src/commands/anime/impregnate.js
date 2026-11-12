const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'impregnate',
  alias: ["embarazar","preg","preñar"],
  category: 'anime',
  desc: 'impregnate',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'impregnate', selfText: "hizo *impregnate*", targetText: "*impregnó* a", emoji: '😈' });
  }
};
