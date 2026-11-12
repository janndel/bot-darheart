const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'creampie',
  alias: [],
  category: 'nsfw',
  desc: 'creampie',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'creampie', selfText: "hizo *creampie*", targetText: "le hizo *creampie* a", emoji: '💦' });
  }
};
