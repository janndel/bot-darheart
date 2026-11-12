const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'danbooru',
  alias: ["dbooru"],
  category: 'nsfw',
  desc: 'danbooru (NSFW)',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'danbooru', selfText: "está en modo *danbooru*", targetText: "le mostró *danbooru* a", emoji: '😈' });
  }
};
