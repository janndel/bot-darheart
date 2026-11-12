const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'hug',
  alias: ["abrazar"],
  category: 'anime',
  desc: 'hug',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'hug', selfText: "dio un *abrazo*", targetText: "*abrazó* a", emoji: '🤗' });
  }
};
