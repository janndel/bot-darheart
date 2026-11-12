const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'tickle',
  alias: ["cosquillas"],
  category: 'anime',
  desc: 'tickle',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'tickle', selfText: "hizo *cosquillas*", targetText: "le hizo cosquillas a", emoji: '🤣' });
  }
};
