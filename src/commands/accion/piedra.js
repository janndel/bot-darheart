const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'piedra',
  alias: ['pedrada'],
  category: 'accion',
  desc: 'Lanzar una piedra a alguien',
  async execute(sock, msg, args, { chatId }) {
    const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mencion || mencion.length === 0) return sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.' });
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'piedra', selfText: "lanzó una *piedra*", targetText: "le lanzó una *piedra* a", emoji: '🪨' });
  }
};
