module.exports = {
    name: 'spam',
    alias: ['avisospam'],
    category: 'admin',
    desc: 'Enviar un mensaje varias veces (máx 10)',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });

        const cantidad = parseInt(args[0]);
        const mensaje = args.slice(1).join(' ');

        if (!cantidad || cantidad < 1 || cantidad > 10 || !mensaje) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ *Uso:* ,spam <1-10> <mensaje>\n\nEjemplo: ,spam 3 Hola a todos'
            });
        }

        for (let i = 0; i < cantidad; i++) {
            try {
                await sock.sendMessage(chatId, { text: mensaje });
                await new Promise(r => setTimeout(r, 1500));
            } catch (e) {}
        }
    }
};
