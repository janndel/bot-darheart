const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'curious',
  alias: ["curioso","curiosa"],
  category: 'anime',
  desc: 'curious',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'curious', selfText: "está *curioso/a*", targetText: "está *curioso/a* por", emoji: '🤔' });
  }
};
