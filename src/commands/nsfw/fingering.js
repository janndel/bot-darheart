const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'fingering',
  alias: [],
  category: 'nsfw',
  desc: 'fingering',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'fingering', selfText: "hizo *fingering*", targetText: "le hizo *fingering* a", emoji: '😈' });
  }
};
