const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'sleep',
  alias: ["dormir"],
  category: 'anime',
  desc: 'sleep',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'sleep', selfText: "está *durmiendo*", targetText: "durmió con", emoji: '😴' });
  }
};
