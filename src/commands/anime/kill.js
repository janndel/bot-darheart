const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'kill',
  alias: ["matar"],
  category: 'anime',
  desc: 'kill',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'kill', selfText: "quiere *matar*", targetText: "*mató* a", emoji: '🔪' });
  }
};
