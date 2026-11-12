const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'handhold',
  alias: ["tomar"],
  category: 'anime',
  desc: 'handhold',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'handhold', selfText: "da la *mano*", targetText: "tomó de la mano a", emoji: '🤝' });
  }
};
