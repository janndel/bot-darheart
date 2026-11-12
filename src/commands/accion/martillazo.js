const { sendReaction } = require('../../lib/anime-media');
module.exports = {
  name: 'martillazo',
  alias: ['martillo'],
  category: 'accion',
  desc: 'Dar un martillazo a alguien',
  async execute(sock, msg, args, { chatId }) {
    const mencion = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mencion || mencion.length === 0) return sock.sendMessage(chatId, { text: '⚠️ Menciona a alguien.' });
    await sendReaction(sock, chatId, msg, { type: 'sfw', action: 'bonk', selfText: "dio un *martillazo*", targetText: "*martilló* a", emoji: '🔨' });
  }
};
