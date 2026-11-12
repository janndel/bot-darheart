const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'grabboobs',
  alias: [],
  category: 'nsfw',
  desc: 'grabboobs',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'grabboobs', selfText: "hizo *grabboobs*", targetText: "le agarró a", emoji: '😈' });
  }
};
