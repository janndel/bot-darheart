const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'fuck',
  alias: ["coger"],
  category: 'nsfw',
  desc: 'fuck',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'fuck', selfText: "quiere *coger*", targetText: "se cogió a", emoji: '😈' });
  }
};
