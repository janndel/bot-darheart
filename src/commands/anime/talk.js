const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'talk',
  alias: ["hablar"],
  category: 'anime',
  desc: 'talk',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'talk', selfText: "está *hablando*", targetText: "habló con", emoji: '💬' });
  }
};
