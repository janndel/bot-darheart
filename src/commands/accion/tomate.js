const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'tomate',
  alias: ['tomatada'],
  category: 'accion',
  desc: 'Lanzar un tomate a alguien',
  async execute(sock, msg, args, { chatId }) {
    const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mencion || mencion.length === 0) return sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.' });
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'tomate', selfText: "lanzó un *tomate*", targetText: "le lanzó un *tomate* a", emoji: '🍅' });
  }
};
