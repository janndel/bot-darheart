const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'sad',
  alias: ["triste"],
  category: 'anime',
  desc: 'sad',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'sad', selfText: "está *triste*", targetText: "está *triste* por", emoji: '😔' });
  }
};
