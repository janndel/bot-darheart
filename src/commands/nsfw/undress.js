const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'undress',
  alias: ["encuerar"],
  category: 'nsfw',
  desc: 'undress',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'undress', selfText: "se desnudó", targetText: "desnudó a", emoji: '😈' });
  }
};
