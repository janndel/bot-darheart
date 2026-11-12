const fs = require('fs');
const path = require('path');

const SUBBOTS_FILE = path.join(process.env.HOME, 'subbots.json');

const OWNERS = ['75501934751805', '584164659101', '584162662671'];

module.exports = {
    name: 'sublist',
    alias: ['subbots', 'listsub'],
    async execute(sock, msg, args, { chatId }) {
        if (chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en privado.' });
        }

        const sender = (msg.key.participant || msg.key.remoteJid || chatId).split('@')[0].split(':')[0];
        if (!OWNERS.includes(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Acceso denegado.' });
        }

        const data = JSON.parse(fs.readFileSync(SUBBOTS_FILE, 'utf8'));
        const activos = Object.entries(data.activos || {});
        const pendientes = activos.filter(([_, info]) => info.estado === 'pendiente');
        const activosOk = activos.filter(([_, info]) => info.estado === 'activo');

        const lista = activos.map(([num, info]) => {
            const vence = new Date(info.vence);
            const dias = Math.ceil((vence - Date.now()) / (1000 * 60 * 60 * 24));
            const emoji = info.estado === 'activo' ? '🟢' : '🟡';
            const estado = info.estado === 'activo' 
                ? `✅ ${dias} días restantes` 
                : '⏳ Pendiente';
            return `${emoji} \`${info.clave}\`\n   📱 ${info.numero || num}\n   ${estado}`;
        }).join('\n\n');

        await sock.sendMessage(chatId, {
            text: `🤖 *PANEL DE SUB-BOTS*\n\n` +
                  `📊 *Resumen:*\n` +
                  `├─ Activos: ${activosOk.length}\n` +
                  `├─ Pendientes: ${pendientes.length}\n` +
                  `└─ Total: ${activos.length}/50\n\n` +
                  (activos.length > 0 ? lista : '_Ningún sub-bot registrado._') +
                  `\n\n🔑 *Claves usadas:* ${data.clavesUsadas.length}`
        });
    }
};
