const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'facesitting',
  alias: [],
  category: 'nsfw',
  desc: 'facesitting',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'facesitting', selfText: "hizo *facesitting*", targetText: "le hizo *facesitting* a", emoji: '😈' });
  }
};
