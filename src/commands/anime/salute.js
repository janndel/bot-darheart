const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'salute',
  alias: ["continencia"],
  category: 'anime',
  desc: 'salute',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'salute', selfText: "hizo un *saludo*", targetText: "saludó a", emoji: '🫡' });
  }
};
