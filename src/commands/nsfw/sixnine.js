const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'sixnine',
  alias: ["69"],
  category: 'nsfw',
  desc: 'sixnine',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'sixnine', selfText: "hizo *69*", targetText: "hizo *69* con", emoji: '😈' });
  }
};
