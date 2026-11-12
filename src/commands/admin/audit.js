const fs = require('fs');
const path = require('path');

// 📋 Lista de comandos que deberían existir (los del menú)
const COMANDOS_MENU = {
    'OWNER': [
        'setmenu', 'activarbot', 'desactivarbot', 'setnombre', 'setdespedida',
        'setperfil', 'addfiltro', 'quitarfiltro', 'setred', 'setprotect', 'setnsfw'
    ],
    'ADMINS': [
        'cerrar', 'abrir', 'status', 'setpfp', 'mutear', 'desmutear', 'del',
        'botlist', 'bot', 'antilink', 'promote', 'demote', 'bienvenida',
        'despedida', 'cambiarenlace', 'tag', 'topactivos', 'modoadmin',
        'reglas', 'ban', 'advertencia', 'aviso', 'aprobartodo', 'cambiarlink'
    ],
    'MIEMBROS': [
        'link', 'menu', 'reglas', 'm', 'play', 'video', 'sticker', 'reporte',
        'ping', 'perfil', 'fotogrupo', 'consejo', 'packname', 'say', 'qr',
        '8ball', 'key', 'keys'
    ],
    'STICKERS': [
        'menubrat', 'random'
    ],
    'DESCARGA': [
        'tiktok', 'facebook', 'x', 'instagram'
    ]
};

const OWNERS = ['75501934751805', '584164659101', '584162662671'];

module.exports = {
    name: 'audit',
    alias: ['lista', 'chequeo'],
    async execute(sock, msg, args, { chatId }) {
        // 🔒 Solo en privado y solo owner
        if (chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en privado.' });
        }

        const sender = (msg.key.participant || msg.key.remoteJid || chatId).split('@')[0].split(':')[0];
        if (!OWNERS.includes(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Acceso denegado.' });
        }

        // 🔍 Leer los archivos realmente existentes
        const archivosPorCarpeta = {};
        const carpetaBase = path.join(process.env.HOME, 'src', 'commands');

        try {
            const carpetas = fs.readdirSync(carpetaBase);
            for (const carpeta of carpetas) {
                const ruta = path.join(carpetaBase, carpeta);
                if (!fs.statSync(ruta).isDirectory()) continue;
                archivosPorCarpeta[carpeta] = fs.readdirSync(ruta)
                    .filter(f => f.endsWith('.js'))
                    .map(f => f.replace('.js', ''));
            }
        } catch (e) {
            return await sock.sendMessage(chatId, { text: `❌ Error leyendo carpetas: ${e.message}` });
        }

        // 📊 Contar totales
        const todosArchivos = Object.values(archivosPorCarpeta).flat();
        const total = todosArchivos.length;

        // 🔎 Comparar con el menú
        const faltantes = [];
        const existentes = [];

        for (const [seccion, comandos] of Object.entries(COMANDOS_MENU)) {
            for (const cmd of comandos) {
                if (todosArchivos.includes(cmd)) {
                    existentes.push(cmd);
                } else {
                    faltantes.push({ seccion, cmd });
                }
            }
        }

        // 📁 Agrupar por carpeta para mostrar
        let detalleArchivos = '';
        for (const [carpeta, archivos] of Object.entries(archivosPorCarpeta)) {
            if (archivos.length === 0) continue;
            detalleArchivos += `\n📂 *${carpeta.toUpperCase()}* (${archivos.length}):\n`;
            detalleArchivos += archivos.map(a => `  ➺ ${a}`).join('\n') + '\n';
        }

        // ❌ Lista de faltantes
        let listaFaltantes = '';
        if (faltantes.length > 0) {
            const porSeccion = {};
            for (const f of faltantes) {
                if (!porSeccion[f.seccion]) porSeccion[f.seccion] = [];
                porSeccion[f.seccion].push(f.cmd);
            }
            for (const [seccion, cmds] of Object.entries(porSeccion)) {
                listaFaltantes += `\n⚠️ *${seccion}* (${cmds.length}):\n`;
                listaFaltantes += cmds.map(c => `  ✗ ${c}`).join('\n') + '\n';
            }
        }

        // 📨 Armar mensaje
        const texto = 
            `🔍 *AUDITORÍA DEL BOT*\n` +
            `━━━━━━━━━━━━━━━━━━━\n\n` +
            `📊 *RESUMEN:*\n` +
            `├─ Archivos cargados: *${total}*\n` +
            `├─ Del menú existentes: *${existentes.length}*\n` +
            `└─ Del menú faltantes: *${faltantes.length}*\n\n` +
            `✅ *COMANDOS CARGADOS:*\n` +
            detalleArchivos +
            `\n━━━━━━━━━━━━━━━━━━━\n` +
            `❌ *FALTANTES DEL MENÚ:*\n` +
            (faltantes.length > 0 ? listaFaltantes : '  _¡Todos implementados!_ 🎉');

        await sock.sendMessage(chatId, { text: texto });
        console.log(`📋 Auditoría ejecutada: ${total} archivos, ${faltantes.length} faltantes`);
    }
};
