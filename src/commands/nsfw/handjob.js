const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'handjob',
  alias: [],
  category: 'nsfw',
  desc: 'handjob',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'handjob', selfText: "hizo *handjob*", targetText: "le hizo *handjob* a", emoji: '😈' });
  }
};
