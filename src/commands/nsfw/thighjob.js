const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'thighjob',
  alias: [],
  category: 'nsfw',
  desc: 'thighjob',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'thighjob', selfText: "hizo *thighjob*", targetText: "le hizo *thighjob* a", emoji: '😈' });
  }
};
