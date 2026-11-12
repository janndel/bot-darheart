module.exports = {
    name: 'bot',
    alias: ['info', 'infobot', 'botinfo'],
    async execute(sock, msg, args, { chatId, config }) {
        const uptime = process.uptime();
        const horas = Math.floor(uptime / 3600);
        const minutos = Math.floor((uptime % 3600) / 60);

        const texto = 
            `🤖 *DARHEART BOT*\n\n` +
            `👤 *Owner:* JANNDEL\n` +
            `📌 *Versión:* v1.0\n` +
            `🎯 *Prefijo:* ${config.prefijo}\n` +
            `⏱️ *Activo hace:* ${horas}h ${minutos}m\n` +
            `📱 *Plataforma:* Termux (Android)\n` +
            `🌐 *Librería:* Baileys\n\n` +
            `_Escribe ${config.prefijo}menu para ver comandos._`;

        await sock.sendMessage(chatId, { text: texto });
    }
};
