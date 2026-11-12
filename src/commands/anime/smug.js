const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'smug',
  alias: ["presumir"],
  category: 'anime',
  desc: 'smug',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'smug', selfText: "está *presumido/a*", targetText: "presumió ante", emoji: '😏' });
  }
};
