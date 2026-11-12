const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'squirt',
  alias: ["squirting"],
  category: 'nsfw',
  desc: 'squirt',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'nsfw', action: 'squirt', selfText: "hizo *squirt*", targetText: "hizo *squirt* con", emoji: '💦' });
  }
};
