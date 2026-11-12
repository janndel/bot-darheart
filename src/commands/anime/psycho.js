const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'psycho',
  alias: [],
  category: 'anime',
  desc: 'psycho',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'psycho', selfText: "se puso *psycho*", targetText: "se puso *psycho* con", emoji: '😵' });
  }
};
