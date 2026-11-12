const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'cachetada',
  alias: ['bofeton', 'sopapo'],
  category: 'accion',
  desc: 'Dar una cachetada a alguien',
  async execute(sock, msg, args, { chatId }) {
    const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mencion || mencion.length === 0) return sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.' });
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'slap', selfText: "dio una *cachetada*", targetText: "*abofeteó* a", emoji: '✋' });
  }
};
