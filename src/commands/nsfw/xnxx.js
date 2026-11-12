const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'xnxx',
  alias: [],
  category: 'nsfw',
  desc: 'xnxx (NSFW)',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'xnxx', selfText: "está en modo *xnxx*", targetText: "le mostró *xnxx* a", emoji: '😈' });
  }
};
