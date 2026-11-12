const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'sneeze',
  alias: ["estornudar"],
  category: 'anime',
  desc: 'sneeze',
  async execute(sock, msg, args, { chatId }) {
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'sneeze', selfText: "*estornudó*", targetText: "estornudó cerca de", emoji: '🤧' });
  }
};
