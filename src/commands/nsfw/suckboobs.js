const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'suckboobs',
  alias: [],
  category: 'nsfw',
  desc: 'suckboobs',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'suckboobs', selfText: "hizo *suckboobs*", targetText: "le chupó a", emoji: '😈' });
  }
};
