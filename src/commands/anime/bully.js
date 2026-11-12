const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'bully',
  alias: ["molestar"],
  category: 'anime',
  desc: 'bully',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'bully', selfText: "está *molestando*", targetText: "*molestó* a", emoji: '😈' });
  }
};
