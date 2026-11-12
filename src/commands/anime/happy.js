const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'happy',
  alias: ["feliz"],
  category: 'anime',
  desc: 'happy',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'happy', selfText: "está *feliz*", targetText: "está *feliz* con", emoji: '😄' });
  }
};
