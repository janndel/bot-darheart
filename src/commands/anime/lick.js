const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'lick',
  alias: ["lamer"],
  category: 'anime',
  desc: 'lick',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'lick', selfText: "*lamió*", targetText: "*lamió* a", emoji: '👅' });
  }
};
