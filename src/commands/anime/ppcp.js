const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'ppcp',
  alias: ["ppcouple"],
  category: 'anime',
  desc: 'ppcp',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'ppcp', selfText: "mostró *ppcp*", targetText: "compartió *ppcp* con", emoji: '💕' });
  }
};
