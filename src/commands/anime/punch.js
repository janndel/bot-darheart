const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'punch',
  alias: ["golpear"],
  category: 'anime',
  desc: 'punch',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'punch', selfText: "dio un *golpe*", targetText: "*golpeó* a", emoji: '👊' });
  }
};
