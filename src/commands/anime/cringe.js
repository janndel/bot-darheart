const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'cringe',
  alias: ["avergonzarse","asco"],
  category: 'anime',
  desc: 'cringe',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'cringe', selfText: "siente *cringe*", targetText: "siente *cringe* por", emoji: '😬' });
  }
};
