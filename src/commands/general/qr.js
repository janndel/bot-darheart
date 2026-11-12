const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = {
    name: 'qr',
    alias: ['codigoqr', 'generarqr'],
    async execute(sock, msg, args, { chatId }) {
        if (args.length === 0) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Escribe el texto o link.\nEjemplo: ,qr https://google.com' 
            });
        }

        const texto = args.join(' ');
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(texto)}`;

        try {
            await sock.sendMessage(chatId, {
                image: { url },
                caption: `📱 *Código QR generado*\n\n_Contenido:_ ${texto}`
            });
            console.log('✅ QR enviado');
        } catch (error) {
            console.error('Error qr:', error.message);
            // Fallback: guardar imagen y enviarla
            try {
                const res = await axios.get(url, { responseType: 'arraybuffer', maxContentLength: 15 * 1024 * 1024 });
                const buffer = Buffer.from(res.data);
                await sock.sendMessage(chatId, {
                    image: buffer,
                    caption: `📱 *Código QR generado*\n\n_Contenido:_ ${texto}`
                });
            } catch (e2) {
                await sock.sendMessage(chatId, { text: `❌ Error: ${e2.message}` });
            }
        }
    }
};
