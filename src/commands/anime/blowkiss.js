const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'blowkiss',
  alias: ["besito"],
  category: 'anime',
  desc: 'blowkiss',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'blowkiss', selfText: "mandó un *besito*", targetText: "le mandó un *besito* a", emoji: '😘' });
  }
};
