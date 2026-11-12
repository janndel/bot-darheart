const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const SUBBOTS_FILE = path.join(process.env.HOME, 'subbots.json');

module.exports = {
    name: 'vincular',
    alias: ['linkbot', 'pairing'],
    async execute(sock, msg, args, { chatId, crearSubbot }) {
        if (chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en privado.' });
        }

        if (args.length === 0) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Envía tu número con código de país.\nEjemplo: ,vincular 584241234567'
            });
        }

        const numero = args[0].replace(/[^0-9]/g, '');
        const senderNum = (msg.key.participant || msg.key.remoteJid).split('@')[0];

        // Verificar que tenga activación pendiente
        const data = JSON.parse(fs.readFileSync(SUBBOTS_FILE, 'utf8'));
        if (!data.activos[senderNum]) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Primero usa ,subbot <clave> para validar tu licencia.'
            });
        }

        if (data.activos[senderNum].estado !== 'pendiente') {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Ya tienes un sub-bot vinculado. Si necesitas uno nuevo, contacta al dueño.'
            });
        }

        try {
            await sock.sendMessage(chatId, { text: '⏳ Generando código de vinculación...' });

            // ✅ Crear subbot (esto usa la función del index.js)
            const codigo = await crearSubbot(senderNum, numero);

            data.activos[senderNum].estado = 'activo';
            data.activos[senderNum].numero = numero;
            writeJsonAtomic(SUBBOTS_FILE, data);

            await sock.sendMessage(chatId, {
                text: `🔑 *TU CÓDIGO DE VINCULACIÓN:*\n\n` +
                      `\`${codigo}\`\n\n` +
                      `📱 *Cómo usarlo:*\n` +
                      `1. Abre WhatsApp en tu teléfono\n` +
                      `2. Ajustes → Dispositivos vinculados\n` +
                      `3. Vincular con número de teléfono\n` +
                      `4. Ingresa el código\n\n` +
                      `📅 *Duración:* 30 días\n` +
                      `⚠️ _Si no lo usas en 5 minutos, expira._`
            });
            console.log(`✅ Sub-bot vinculado: ${senderNum} → ${numero}`);
        } catch (error) {
            console.error('Error vincular:', error.message);
            await sock.sendMessage(chatId, {
                text: `❌ Error generando código: ${error.message}`
            });
        }
    }
};
