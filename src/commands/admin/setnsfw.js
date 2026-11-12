const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'config_grupos.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

// Palabras clave que indican contenido NSFW (en español/inglés)
const PALABRAS_NSFW = [
    'porno', 'porn', 'xxx', 'nsfw', 'onlyfans', 'pack', 'packs',
    'desnudo', 'desnuda', 'nude', 'nudes', 'sexo', 'sex',
    'puta', 'puto', 'pene', 'vagina', 'culo', 'tetas', 'teta',
    'masturb', 'orgia', 'orgía', 'xxx', '18+', '+18', 'cp',
    'pedofil', 'violac', 'violar', 'follar', 'folla'
];

module.exports = {
    name: 'setnsfw',
    alias: ['nsfw', 'antinsfw'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }
        const data = cargar();
        if (!data[chatId]) data[chatId] = {};
        const op = (args[0] || '').toLowerCase();

        if (op === 'on') {
            data[chatId].nsfw = true;
            guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🔞 *Filtro NSFW activado*\n\n` +
                      `Cualquier mensaje con contenido sensible será eliminado automáticamente.\n\n` +
                      `⚠️ Solo funciona en texto. Imágenes/videos requieren revisión manual.`
            });
        }
        if (op === 'off') {
            data[chatId].nsfw = false;
            guardar(data);
            return await sock.sendMessage(chatId, { text: '✅ *Filtro NSFW desactivado.*' });
        }

        const estado = data[chatId].nsfw ? '🟢 Activado' : '🔴 Desactivado';
        await sock.sendMessage(chatId, {
            text: `🔞 *Filtro NSFW:* ${estado}\n\n` +
                  `_,setnsfw on_ → activar\n` +
                  `_,setnsfw off_ → desactivar`
        });
    },
    PALABRAS_NSFW // Se exporta para que el index.js lo use
};
