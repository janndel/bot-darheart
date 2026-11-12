const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'waifu',
  alias: ["neko","maid","boy","girl","beach","loli"],
  category: 'anime',
  desc: 'waifu',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'waifu', selfText: "mostró *waifu*", targetText: "mostró *waifu* a", emoji: '🌸' });
  }
};
