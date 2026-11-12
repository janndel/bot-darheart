const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'drunk',
  alias: ["ebrio","ebria"],
  category: 'anime',
  desc: 'drunk',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'drunk', selfText: "está *ebrio/a*", targetText: "está *ebrio/a* con", emoji: '🥴' });
  }
};
