const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'patada',
  alias: ['kick2'],
  category: 'accion',
  desc: 'Dar una patada a alguien',
  async execute(sock, msg, args, { chatId }) {
    const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mencion || mencion.length === 0) return sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.' });
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'kick', selfText: "dio una *patada*", targetText: "*pateó* a", emoji: '🦵' });
  }
};
