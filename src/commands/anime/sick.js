const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'sick',
  alias: ["enfermo","enferma"],
  category: 'anime',
  desc: 'sick',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'sick', selfText: "está *enfermo/a*", targetText: "cuidó a", emoji: '🤒' });
  }
};
