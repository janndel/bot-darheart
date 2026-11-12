const { writeJsonAtomic } = require('../../lib/json-store');
const { esAdminEnGrupo } = require('../../lib/grupo');
const { esOwner } = require('../../lib/permissions');
const fs = require('fs');
const path = require('path');

const REGLAS_FILE = path.join(process.env.HOME, 'reglas_grupos.json');

function cargar() {
    try { return JSON.parse(fs.readFileSync(REGLAS_FILE, 'utf8')); } catch { return {}; }
}
function guardar(d) {
    writeJsonAtomic(REGLAS_FILE, d);
}

module.exports = {
    name: 'reglas',
    alias: ['rules', 'normas'],
    category: 'general',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        const data = cargar();

        // Si el usuario escribe texto después del comando, lo guarda como reglas
        if (args.length > 0) {
            const remitente = msg.key.participant || msg.key.remoteJid;
            if (!esOwner(sock, msg) && !(await esAdminEnGrupo(sock, chatId, remitente))) {
                return await sock.sendMessage(chatId, { text: '🔒 Solo administradores pueden cambiar las reglas.' });
            }
            const texto = args.join(' ');
            data[chatId] = texto;
            guardar(data);
            return await sock.sendMessage(chatId, { 
                text: '✅ *Reglas actualizadas.*' 
            });
        }

        // Si no, muestra las reglas guardadas o el mensaje por defecto
        const reglas = data[chatId] || 
            '📜 *REGLAS DEL GRUPO*\n\n' +
            '1. Respeto entre todos\n' +
            '2. No spam ni publicidad\n' +
            '3. No enlaces externos sin permiso\n' +
            '4. No contenido +18\n' +
            '5. Usar el bot con moderación';

        await sock.sendMessage(chatId, { text: reglas });
    }
};
