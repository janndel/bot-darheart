const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'run',
  alias: ["correr"],
  category: 'anime',
  desc: 'run',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'run', selfText: "está *corriendo*", targetText: "*corrió* con", emoji: '🏃' });
  }
};
