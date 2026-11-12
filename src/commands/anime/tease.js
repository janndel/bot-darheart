const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'tease',
  alias: ["bromear"],
  category: 'anime',
  desc: 'tease',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'tease', selfText: "está *bromeando*", targetText: "bromeó con", emoji: '😜' });
  }
};
