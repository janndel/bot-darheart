const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'spit',
  alias: ["escupir"],
  category: 'anime',
  desc: 'spit',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'spit', selfText: "*escupió*", targetText: "le escupió a", emoji: '🤮' });
  }
};
