const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'orgy',
  alias: ["orgia"],
  category: 'nsfw',
  desc: 'orgy',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'orgy', selfText: "quiere una *orgia*", targetText: "hizo *orgia* con", emoji: '😈' });
  }
};
