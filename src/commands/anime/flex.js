const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'flex',
  alias: ["flexionar"],
  category: 'anime',
  desc: 'flex',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'flex', selfText: "hizo *flex*", targetText: "presumió a", emoji: '💪' });
  }
};
