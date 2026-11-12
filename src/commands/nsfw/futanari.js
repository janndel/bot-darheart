const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'futanari',
  alias: ["futa"],
  category: 'nsfw',
  desc: 'futanari',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'futanari', selfText: "hizo *futanari*", targetText: "hizo *futanari* con", emoji: '😈' });
  }
};
