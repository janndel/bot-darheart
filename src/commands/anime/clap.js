const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'clap',
  alias: ["aplaudir"],
  category: 'anime',
  desc: 'clap',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'clap', selfText: "está *aplaudiendo*", targetText: "*aplaudió* a", emoji: '👏' });
  }
};
