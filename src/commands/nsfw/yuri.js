const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'yuri',
  alias: ["tijeras"],
  category: 'nsfw',
  desc: 'yuri',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'yuri', selfText: "hizo *yuri*", targetText: "hizo *yuri* con", emoji: '😈' });
  }
};
