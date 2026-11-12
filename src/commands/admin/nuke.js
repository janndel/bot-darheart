const { writeJsonAtomic } = require('../../lib/json-store');
const { cargarActivos, guardarActivos } = require('../../lib/grupo');
const fs = require('fs');
const path = require('path');

const MUTE_FILE = path.join(process.env.HOME, 'muted_users.json');
const WARNS_FILE = path.join(process.env.HOME, 'warns.json');

function cargar(f) { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return {}; } }
function guardar(f, d) { writeJsonAtomic(f, d); }

const OWNERS = ['75501934751805', '584164659101', '584162662671'];

module.exports = {
    name: 'nuke',
    alias: ['limpiargrupo', 'resetdata'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        const sender = (msg.key.participant || msg.key.remoteJid).split('@')[0].split(':')[0];
        if (!OWNERS.includes(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Solo el dueño puede usar esto.' });
        }

        if (args[0]?.toLowerCase() !== 'confirmar') {
            return await sock.sendMessage(chatId, {
                text: `⚠️ *ADVERTENCIA*\n\nEsto borrará:\n` +
                      `➺ Ranking de activos\n` +
                      `➺ Lista de muteados\n` +
                      `➺ Warns de todos\n\n` +
                      `_Para confirmar:_ ,nuke confirmar`
            });
        }

        // Borrar datos del grupo
        const activos = cargarActivos();
        delete activos[chatId];
        guardarActivos(activos);

        const mute = cargar(MUTE_FILE);
        delete mute[chatId];
        guardar(MUTE_FILE, mute);

        const warns = cargar(WARNS_FILE);
        delete warns[chatId];
        guardar(WARNS_FILE, warns);

        await sock.sendMessage(chatId, {
            text: `💥 *GRUPO RESETEADO*\n\n✅ Ranking borrado\n✅ Muteados borrados\n✅ Warns borrados`
        });
        console.log(`💥 Nuke en ${chatId}`);
    }
};
