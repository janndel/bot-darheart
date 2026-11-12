const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'kiss',
  alias: ["muak"],
  category: 'anime',
  desc: 'kiss',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'kiss', selfText: "dio un *beso*", targetText: "*besó* a", emoji: '💋' });
  }
};
