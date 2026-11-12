const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'xvideos',
  alias: [],
  category: 'nsfw',
  desc: 'xvideos (NSFW)',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'xvideos', selfText: "está en modo *xvideos*", targetText: "le mostró *xvideos* a", emoji: '😈' });
  }
};
