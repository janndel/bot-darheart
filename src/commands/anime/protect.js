const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'protect',
  alias: ["proteger"],
  category: 'anime',
  desc: 'protect',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'protect', selfText: "quiere *proteger*", targetText: "*protegió* a", emoji: '🛡️' });
  }
};
