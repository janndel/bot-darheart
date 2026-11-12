const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'jealous',
  alias: ["celoso","celosa"],
  category: 'anime',
  desc: 'jealous',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'jealous', selfText: "está *celoso/a*", targetText: "está *celoso/a* de", emoji: '😒' });
  }
};
