const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'seduce',
  alias: ["seducir"],
  category: 'anime',
  desc: 'seduce',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'seduce', selfText: "está *seduciendo*", targetText: "*sedujo* a", emoji: '😏' });
  }
};
