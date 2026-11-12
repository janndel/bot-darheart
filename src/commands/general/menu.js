const fs = require('fs');
const path = require('path');
const { enviarRich, leerImagenMenu, leerImagenMenuUrl, NOMBRE_BOT } = require('../../lib/rich');

const COMMANDS_DIR = path.join(__dirname, '..');

const CARPETAS = {
    general:    { emoji: '👥', titulo: 'GENERAL / UTILIDADES', num: 1 },
    admin:      { emoji: '🛡️', titulo: 'GRUPO / ADMIN',        num: 2 },
    economia:   { emoji: '💰', titulo: 'ECONOMÍA',             num: 3 },
    juegos:     { emoji: '🎮', titulo: 'JUEGOS',               num: 4 },
    retos:      { emoji: '🔥', titulo: 'RETOS',                num: 5 },
    accion:     { emoji: '💥', titulo: 'ACCIÓN',               num: 6 },
    stickers:   { emoji: '🎨', titulo: 'STICKERS',             num: 7 },
    download:   { emoji: '📥', titulo: 'DESCARGAS',            num: 8 },
    owner:      { emoji: '👑', titulo: 'OWNER',                num: 9 },
    gacha:      { emoji: '🎴', titulo: 'GACHA',                num: 10 },
    perfil:     { emoji: '🪪', titulo: 'PERFIL',               num: 11 },
    sockets:    { emoji: '🔌', titulo: 'SOCKETS',              num: 12 },
    nsfw:       { emoji: '🔞', titulo: 'NSFW',                 num: 13 },
    anime:      { emoji: '🌸', titulo: 'ANIME',                num: 14 }
};

const ORDEN = ['general', 'admin', 'economia', 'juegos', 'retos', 'accion', 'stickers', 'download', 'owner', 'gacha', 'perfil', 'sockets', 'nsfw', 'anime'];
const POR_BLOQUE = 10;
const POR_PAGINA = 30;
const MUESTRA_INICIO = 10;

function normalizar(texto) {
    return String(texto || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function escanearComandos() {
    const porCarpeta = {};
    try {
        for (const carpeta of fs.readdirSync(COMMANDS_DIR)) {
            const rutaCarpeta = path.join(COMMANDS_DIR, carpeta);
            if (!fs.statSync(rutaCarpeta).isDirectory()) continue;
            porCarpeta[carpeta] = [];
            for (const archivo of fs.readdirSync(rutaCarpeta).filter(f => f.endsWith('.js'))) {
                try {
                    const cmd = require(path.join(rutaCarpeta, archivo));
                    if (!cmd || !cmd.name || cmd.oculto) continue;
                    porCarpeta[carpeta].push({
                        nombre: cmd.name,
                        desc: cmd.desc || cmd.description || ''
                    });
                } catch (error) {}
            }
            porCarpeta[carpeta].sort((a, b) => a.nombre.localeCompare(b.nombre));
        }
    } catch (error) {
        console.log('⚠️ menu.js error:', error.message);
    }
    return porCarpeta;
}

function chunks(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}

module.exports = {
    name: 'menu',
    alias: ['help', 'ayuda', 'comandos', 'allmenu'],
    category: 'general',
    desc: 'Muestra todos los comandos con menús colapsables',
    async execute(sock, msg, args, { chatId, config }) {
        const p = config.prefijo;
        const porCarpeta = escanearComandos();
        const imagen = leerImagenMenu();
        const imagenUrl = leerImagenMenuUrl();
        const buscado = normalizar(args[0]);

        let carpeta = null;
        if (buscado) {
            if (/^\d+$/.test(buscado)) {
                carpeta = ORDEN[parseInt(buscado, 10) - 1] || null;
            } else {
                carpeta = Object.keys(porCarpeta).find(c =>
                    normalizar(c) === buscado ||
                    normalizar(CARPETAS[c]?.titulo) === buscado
                ) || null;
            }

            if (!carpeta || !porCarpeta[carpeta] || porCarpeta[carpeta].length === 0) {
                const disponibles = ORDEN
                    .filter(c => porCarpeta[c]?.length > 0)
                    .map(c => `${(CARPETAS[c]||{num:'-',emoji:'📁',titulo:c}).num}. ${(CARPETAS[c]||{emoji:'📁'}).emoji} ${(CARPETAS[c]||{titulo:c}).titulo} (${porCarpeta[c].length})`)
                    .join('\n');
                return await sock.sendMessage(chatId, {
                    text: `⚠️ *Categoría no encontrada*\n\n${disponibles}\n\n📌 Usa *${p}menu <número o nombre>*`
                });
            }

            const info = CARPETAS[carpeta] || { emoji: '📁', titulo: carpeta.toUpperCase() };
            const todos = porCarpeta[carpeta];
            const totalPaginas = Math.max(1, Math.ceil(todos.length / POR_PAGINA));
            let pagina = parseInt(args[1], 10);
            if (!Number.isFinite(pagina) || pagina < 1) pagina = 1;
            if (pagina > totalPaginas) pagina = totalPaginas;
            const inicio = (pagina - 1) * POR_PAGINA;
            const comandos = todos.slice(inicio, inicio + POR_PAGINA).map(c => `${p}${c.nombre}`);
            const partes = chunks(comandos, POR_BLOQUE);

            const rich = [];
            rich.push({ text: `## ${info.emoji} ${info.titulo} (${todos.length})` });
            rich.push({ text: `**Página ${pagina}/${totalPaginas}**` });
            for (let i = 0; i < partes.length; i++) {
                const etiqueta = partes.length > 1 ? `**Bloque ${i + 1}/${partes.length}**` : `**${info.titulo}**`;
                rich.push({ text: etiqueta });
                rich.push({ language: 'bash', code: [{ highlightType: 0, codeContent: partes[i].join('\n') }] });
            }
            const navegacion = [];
            if (pagina > 1) navegacion.push(`⬅️ *${p}menu ${carpeta} ${pagina - 1}*`);
            if (pagina < totalPaginas) navegacion.push(`➡️ *${p}menu ${carpeta} ${pagina + 1}*`);
            rich.push({ text: `---\n${navegacion.length ? navegacion.join('\n') + '\n' : ''}📌 *${p}menu* para volver al índice` });

            return await enviarRich(sock, chatId, rich, {
                disclaimerText: `${NOMBRE_BOT} — Prefijo: ${p}`,
                footerText: `${NOMBRE_BOT} — by JANNDEL`,
                imagen,
                imagenUrl
            });
        }

        const rich = [];
        rich.push({ text: `## 🤖 ${NOMBRE_BOT} — Comandos` });
        let total = 0;

        for (const carpetaActual of ORDEN) {
            const comandos = porCarpeta[carpetaActual];
            if (!comandos || comandos.length === 0) continue;
            const info = CARPETAS[carpetaActual] || { emoji: '📁', titulo: carpetaActual, num: '-' };
            const muestra = comandos.slice(0, MUESTRA_INICIO).map(c => `${p}${c.nombre}`);
            const paginas = Math.max(1, Math.ceil(comandos.length / POR_PAGINA));

            rich.push({ text: `## ◆ ${info.emoji} ${info.titulo} (${comandos.length})` });
            rich.push({ language: 'bash', code: [{ highlightType: 0, codeContent: muestra.join('\n') }] });
            if (comandos.length > MUESTRA_INICIO) {
                rich.push({ text: `_y ${comandos.length - MUESTRA_INICIO} más_ → *${p}menu ${info.num} 1* (${paginas} pág.)` });
            }
            total += comandos.length;
        }

        rich.push({ text: `---\n📊 *Total:* ${total} comandos` });
        rich.push({ text: `📌 Usa *${p}menu <número> [página]*\n_Ejemplo:_ ${p}menu 3 2` });

        await enviarRich(sock, chatId, rich, {
            disclaimerText: `${NOMBRE_BOT} — Prefijo: ${p}`,
            footerText: `${NOMBRE_BOT} — by JANNDEL`,
            imagen,
            imagenUrl
        });
    }
};
