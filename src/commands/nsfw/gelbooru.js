const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'gelbooru',
  alias: ["gbooru"],
  category: 'nsfw',
  desc: 'gelbooru (NSFW)',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'gelbooru', selfText: "está en modo *gelbooru*", targetText: "le mostró *gelbooru* a", emoji: '😈' });
  }
};
