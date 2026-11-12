const fs = require('fs');
const path = require('path');
const { readJson, writeJsonAtomic } = require('../../lib/json-store');

const HOME = process.env.HOME || '/data/data/com.termux/files/home';
const BACKUP_DIR = path.join(HOME, 'backup_local');
const ARCHIVOS = [
    'config.json', 'premium.json', 'config_grupos.json',
    'activos.json', 'muted_users.json', 'packname.json',
    'menu_config.json', 'subbots.json', 'recordatorios.json',
    'descargas_pendientes.json', 'descargas_fallidas.json',
    'descargas_programadas.json'
];

module.exports = {
    name: 'restaurar',
    alias: [],
    category: 'owner',
    desc: 'Restaura un backup local seleccionado',
    oculto: true,
    ownerOnly: true,
    timeout: 30000,
    async execute(sock, msg, args, { chatId }) {
        if (chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en privado.' });
        }
        const sender = (msg.key.participant || msg.key.remoteJid || chatId).split('@')[0].split(':')[0];
        if (!['75501934751805', '584164659101', '584162662671'].includes(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Acceso denegado.' });
        }

        const n = Number(args[0]);
        if (!n || n < 1) {
            return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,restaurar <número>' });
        }

        const respaldos = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith('.json')).sort();
        if (!respaldos.length) {
            return await sock.sendMessage(chatId, { text: '📭 No hay backups locales.' });
        }
        if (n > respaldos.length) {
            return await sock.sendMessage(chatId, { text: `⚠️ Solo ${respaldos.length} backups disponibles.` });
        }

        const archivoSeleccionado = respaldos[n - 1];
        const rutaBackup = path.join(BACKUP_DIR, archivoSeleccionado);
        const nombre = archivoSeleccionado;

        try {
            const data = await readJson(rutaBackup, { items: [] });
            // Restaurar cada archivo correspondiendo su nombre (quitar prefijo timestamp)
            const nombreOriginal = archivoSeleccionado.replace(/^\d+[-_]/, '');

            let restaurados = 0;
            for (const archivo of ARCHIVOS) {
                if (archivo === nombreOriginal) {
                    const destino = path.join(HOME, archivo);
                    writeJsonAtomic(destino, data);
                    restaurados++;
                }
            }

            await sock.sendMessage(chatId, {
                text: `✅ *Restaurado*\n\n📦 Archivo: ${nombreOriginal}\\n📁 Destino: ${HOME}\\n📊 Registros: ${restaurados}`
            });
        } catch (e) {
            await sock.sendMessage(chatId, { text: `❌ Error al restaurar: ${String(e.message).slice(0, 300)}` });
        }
    }
};