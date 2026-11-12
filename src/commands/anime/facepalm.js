const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'facepalm',
  alias: [],
  category: 'anime',
  desc: 'facepalm',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'facepalm', selfText: "hizo *facepalm*", targetText: "hizo *facepalm* por", emoji: '🤦' });
  }
};
