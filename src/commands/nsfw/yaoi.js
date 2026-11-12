const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'yaoi',
  alias: [],
  category: 'nsfw',
  desc: 'yaoi',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'yaoi', selfText: "hizo *yaoi*", targetText: "hizo *yaoi* con", emoji: '😈' });
  }
};
