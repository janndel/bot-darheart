const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'blowjob',
  alias: ["mamada"],
  category: 'nsfw',
  desc: 'blowjob',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'blowjob', selfText: "hizo *blowjob*", targetText: "le hizo *blowjob* a", emoji: '😈' });
  }
};
