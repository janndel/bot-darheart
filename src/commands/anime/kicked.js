const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'kicked',
  alias: ["patear","patada"],
  category: 'anime',
  desc: 'kicked',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'kicked', selfText: "dio una *patada*", targetText: "*pateó* a", emoji: '🦵' });
  }
};
