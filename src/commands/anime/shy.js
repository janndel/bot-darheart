const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'shy',
  alias: ["timido","timida"],
  category: 'anime',
  desc: 'shy',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'shy', selfText: "está *tímido/a*", targetText: "está *tímido/a* con", emoji: '😳' });
  }
};
