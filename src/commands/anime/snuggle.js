const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'snuggle',
  alias: ["acurrucar"],
  category: 'anime',
  desc: 'snuggle',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'snuggle', selfText: "se *acurruca*", targetText: "se acurrucó con", emoji: '🫂' });
  }
};
