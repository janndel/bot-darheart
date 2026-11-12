const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'heat',
  alias: ["calor"],
  category: 'anime',
  desc: 'heat',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'heat', selfText: "tiene *calor*", targetText: "tiene *calor* con", emoji: '🥵' });
  }
};
