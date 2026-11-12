const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'kisscheek',
  alias: ["beso","besar"],
  category: 'anime',
  desc: 'kisscheek',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'kisscheek', selfText: "dio un *beso*", targetText: "besó la mejilla de", emoji: '💋' });
  }
};
