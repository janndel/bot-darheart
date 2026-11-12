const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'r34',
  alias: ["rule34", "rule"],
  category: 'nsfw',
  desc: 'r34 (NSFW)',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'r34', selfText: "está en modo *r34*", targetText: "le hizo *r34* a", emoji: '🔞' });
  }
};
