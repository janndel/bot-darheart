const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'bored',
  alias: ["aburrido","aburrida"],
  category: 'anime',
  desc: 'bored',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'bored', selfText: "está *aburrido/a*", targetText: "está *aburrido/a* con", emoji: '😐' });
  }
};
