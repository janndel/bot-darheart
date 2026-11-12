const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'stare',
  alias: ["mirar"],
  category: 'anime',
  desc: 'stare',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'stare', selfText: "está *mirando*", targetText: "miró fijamente a", emoji: '👁️' });
  }
};
