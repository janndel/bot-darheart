'use strict';

const axios = require('axios');

const UA = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36 DARHEART-OSINT/1.0';
const TIMEOUT = 8000;
const MAX_REDIRECTS = 3;
const COOLDOWN_MS = 30000;
const CACHE_MS = 5 * 60 * 1000;
const cooldowns = new Map();
const cache = new Map();

async function pedir(url, extra = {}) {
    return axios.request({
        url,
        method: 'get',
        timeout: TIMEOUT,
        maxRedirects: MAX_REDIRECTS,
        validateStatus: () => true,
        ...extra,
        headers: {
            'User-Agent': UA,
            Accept: 'application/json, text/html;q=0.9, */*;q=0.8',
            ...(extra.headers || {})
        }
    });
}

const SITIOS = [
    {
        nombre: 'GitHub',
        url: (u) => `https://github.com/${u}`,
        async check(u) {
            const r = await pedir(`https://api.github.com/users/${encodeURIComponent(u)}`);
            if (r.status === 200 && r.data && r.data.login) return true;
            if (r.status === 404) return false;
            return null;
        }
    },
    {
        nombre: 'GitLab',
        url: (u) => `https://gitlab.com/${u}`,
        async check(u) {
            const r = await pedir(`https://gitlab.com/api/v4/users?username=${encodeURIComponent(u)}`);
            if (r.status !== 200 || !Array.isArray(r.data)) return null;
            return r.data.some(x => String(x.username).toLowerCase() === u.toLowerCase());
        }
    },
    {
        nombre: 'Telegram',
        url: (u) => `https://t.me/${u}`,
        async check(u) {
            const r = await pedir(`https://t.me/${encodeURIComponent(u)}`);
            if (r.status !== 200 || typeof r.data !== 'string') return null;
            const m = r.data.match(/property=["']og:title["']\s+content=["']([^"']*)["']/i)
                || r.data.match(/content=["']([^"']*)["']\s+property=["']og:title["']/i);
            if (!m || !m[1].trim()) return null;
            return m[1].trim().toLowerCase() !== `telegram: contact @${u.toLowerCase()}`;
        }
    },
    {
        nombre: 'Steam',
        url: (u) => `https://steamcommunity.com/id/${u}`,
        async check(u) {
            const r = await pedir(`https://steamcommunity.com/id/${encodeURIComponent(u)}/?xml=1`);
            if (r.status === 404) return false;
            if (r.status !== 200 || typeof r.data !== 'string') return null;
            if (/<error>[\s\S]*?could not be found[\s\S]*?<\/error>/i.test(r.data)) return false;
            if (/<steamID64>\d+<\/steamID64>/i.test(r.data)) return true;
            return null;
        }
    },
    {
        nombre: 'Roblox',
        url: (u) => `https://www.roblox.com/search/users?keyword=${u}`,
        async check(u) {
            const r = await pedir('https://users.roblox.com/v1/usernames/users', {
                method: 'post',
                data: { usernames: [u], excludeBannedUsers: true },
                headers: { 'Content-Type': 'application/json' }
            });
            if (r.status !== 200 || !r.data || !Array.isArray(r.data.data)) return null;
            return r.data.data.length > 0;
        }
    },
    {
        nombre: 'Minecraft',
        url: (u) => `https://namemc.com/profile/${u}`,
        async check(u) {
            const r = await pedir(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(u)}`);
            if (r.status === 200 && r.data && r.data.id) return true;
            if (r.status === 204 || r.status === 404) return false;
            return null;
        }
    },
    {
        nombre: 'Hacker News',
        url: (u) => `https://news.ycombinator.com/user?id=${u}`,
        async check(u) {
            const r = await pedir(`https://hacker-news.firebaseio.com/v0/user/${encodeURIComponent(u)}.json`);
            if (r.status !== 200) return null;
            if (r.data === null) return false;
            return Boolean(r.data && r.data.id);
        }
    },
    {
        nombre: 'Keybase',
        url: (u) => `https://keybase.io/${u}`,
        async check(u) {
            const r = await pedir(`https://keybase.io/_/api/1.0/user/lookup.json?username=${encodeURIComponent(u)}`);
            if (r.status !== 200 || !r.data || typeof r.data !== 'object') return null;
            const estado = r.data.status && r.data.status.name;
            if (estado === 'OK' && Array.isArray(r.data.them) && r.data.them.length > 0) return true;
            if (estado === 'NOT_FOUND') return false;
            return null;
        }
    },
    {
        nombre: 'Dev.to',
        url: (u) => `https://dev.to/${u}`,
        async check(u) {
            const r = await pedir(`https://dev.to/api/users/by_username?url=${encodeURIComponent(u)}`);
            if (r.status === 200 && r.data && r.data.username) return true;
            if (r.status === 404) return false;
            return null;
        }
    },
    {
        nombre: 'Codeforces',
        url: (u) => `https://codeforces.com/profile/${u}`,
        async check(u) {
            const r = await pedir(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(u)}`);
            if (r.status !== 200 || !r.data || typeof r.data !== 'object') return null;
            if (r.data.status === 'OK' && Array.isArray(r.data.result) && r.data.result.length > 0) return true;
            if (r.data.status === 'FAILED' && /not found/i.test(String(r.data.comment || ''))) return false;
            return null;
        }
    },
    {
        nombre: 'Lichess',
        url: (u) => `https://lichess.org/@/${u}`,
        async check(u) {
            const r = await pedir(`https://lichess.org/api/user/${encodeURIComponent(u)}`);
            if (r.status === 200 && r.data && r.data.username) return true;
            if (r.status === 404) return false;
            return null;
        }
    },
    {
        nombre: 'Docker Hub',
        url: (u) => `https://hub.docker.com/u/${u}`,
        async check(u) {
            const r = await pedir(`https://hub.docker.com/v2/users/${encodeURIComponent(u)}/`);
            if (r.status === 200 && r.data && (r.data.username || r.data.orgname)) return true;
            if (r.status === 404) return false;
            return null;
        }
    },
    {
        nombre: 'Codeberg',
        url: (u) => `https://codeberg.org/${u}`,
        async check(u) {
            const r = await pedir(`https://codeberg.org/api/v1/users/${encodeURIComponent(u)}`);
            if (r.status === 200 && r.data && r.data.login) return true;
            if (r.status === 404) return false;
            return null;
        }
    },
    {
        nombre: 'Hugging Face',
        url: (u) => `https://huggingface.co/${u}`,
        async check(u) {
            const r = await pedir(`https://huggingface.co/api/users/${encodeURIComponent(u)}/overview`);
            if (r.status === 200 && r.data && !r.data.error) return true;
            if (r.status === 404) return false;
            return null;
        }
    },
    {
        nombre: 'Chess.com',
        url: (u) => `https://www.chess.com/member/${u}`,
        async check(u) {
            const r = await pedir(`https://api.chess.com/pub/player/${encodeURIComponent(u)}`);
            if (r.status === 200 && r.data && r.data.username) return true;
            if (r.status === 404) return false;
            return null;
        }
    },
    {
        nombre: 'Stack Overflow',
        url: (u) => `https://stackoverflow.com/users?search=${u}`,
        async check(u) {
            const r = await pedir(`https://api.stackexchange.com/2.3/users?inname=${encodeURIComponent(u)}&site=stackoverflow`);
            if (r.status !== 200 || !r.data || !Array.isArray(r.data.items)) return null;
            return r.data.items.some(x => String(x.display_name).toLowerCase() === u.toLowerCase());
        }
    }
];

function enlacesManuales(u) {
    return [
        ['Instagram', `https://www.instagram.com/${u}/`],
        ['TikTok', `https://www.tiktok.com/@${u}`],
        ['X / Twitter', `https://x.com/${u}`],
        ['Facebook', `https://www.facebook.com/${u}`],
        ['YouTube', `https://www.youtube.com/@${u}`],
        ['Threads', `https://www.threads.net/@${u}`],
        ['Pinterest', `https://www.pinterest.com/${u}/`],
        ['Twitch', `https://www.twitch.tv/${u}`],
        ['Reddit', `https://www.reddit.com/user/${u}/`],
        ['Bluesky', `https://bsky.app/search?q=${u}`],
        ['Mastodon', `https://mastodon.social/@${u}`],
        ['Spotify', `https://open.spotify.com/user/${u}`],
        ['npm', `https://www.npmjs.com/~${u}`],
        ['Snapchat', `https://www.snapchat.com/add/${u}`]
    ];
}

function enlacesNombre(nombre) {
    const q = encodeURIComponent(`"${nombre}"`);
    return [
        ['Google', `https://www.google.com/search?q=${q}`],
        ['Bing', `https://www.bing.com/search?q=${q}`],
        ['DuckDuckGo', `https://duckduckgo.com/?q=${q}`],
        ['Brave Search', `https://search.brave.com/search?q=${q}`],
        ['GitHub', `https://github.com/search?q=${q}&type=users`],
        ['Reddit', `https://www.reddit.com/search/?q=${q}`]
    ];
}

function limpiarHtml(texto) {
    return String(texto || '')
        .replace(/<[^>]*>/g, '')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

async function buscarNombre(nombre) {
    const [wiki, wikidata] = await Promise.all([
        (async () => {
            try {
                const r = await pedir(`https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(nombre)}&format=json&srlimit=3&utf8=1`);
                if (r.status !== 200 || !r.data || !r.data.query || !Array.isArray(r.data.query.search)) return [];
                return r.data.query.search.map(x => ({
                    titulo: x.title,
                    detalle: limpiarHtml(x.snippet).slice(0, 160),
                    url: `https://es.wikipedia.org/wiki/${encodeURIComponent(String(x.title).replace(/ /g, '_'))}`
                }));
            } catch {
                return [];
            }
        })(),
        (async () => {
            try {
                const r = await pedir(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(nombre)}&language=es&uselang=es&format=json&limit=3`);
                if (r.status !== 200 || !r.data || !Array.isArray(r.data.search)) return [];
                return r.data.search.map(x => ({
                    titulo: x.label || (x.display && x.display.label && x.display.label.value) || x.id,
                    detalle: x.description || (x.display && x.display.description && x.display.description.value) || '',
                    url: `https://www.wikidata.org/wiki/${x.id}`
                }));
            } catch {
                return [];
            }
        })()
    ]);

    return { wiki, wikidata };
}

async function conLimite(items, limite, fn) {
    const resultados = new Array(items.length);
    let indice = 0;
    const trabajadores = Array.from({ length: Math.min(limite, items.length) }, async () => {
        while (true) {
            const actual = indice++;
            if (actual >= items.length) return;
            resultados[actual] = await fn(items[actual]);
        }
    });
    await Promise.all(trabajadores);
    return resultados;
}

function uso(prefijo) {
    return `🕵️ *OSINT LEGAL*\n\n` +
        `⚠️ *Uso:*\n` +
        `• ${prefijo}osint <usuario>\n` +
        `• ${prefijo}osint nombre <nombre completo>\n\n` +
        `📌 *Ejemplos:*\n` +
        `• ${prefijo}osint janndel\n` +
        `• ${prefijo}osint nombre Juan Pérez\n\n` +
        `ℹ️ Solo busca información pública y enlaces abiertos. No accede a cuentas privadas ni elude autenticación.`;
}

module.exports = {
    name: 'osint',
    alias: ['osi', 'buscarusuario', 'username', 'userlookup'],
    category: 'general',
    desc: 'OSINT legal: busca un usuario en sitios públicos',
    async execute(sock, msg, args, { chatId, config }) {
        const prefijo = config.prefijo;
        const remitente = String(msg.key.participant || msg.key.remoteJid || chatId).split('@')[0].split(':')[0];
        const ahora = Date.now();
        const ultimo = cooldowns.get(remitente) || 0;

        if (ahora - ultimo < COOLDOWN_MS) {
            const restante = Math.ceil((COOLDOWN_MS - (ahora - ultimo)) / 1000);
            return sock.sendMessage(chatId, { text: `⏳ Espera *${restante}s* antes de volver a usar OSINT.` });
        }

        let consulta = args.join(' ').trim().replace(/^["']|["']$/g, '').replace(/\s+/g, ' ');
        if (!consulta || consulta.toLowerCase() === 'ayuda' || consulta === '?') {
            return sock.sendMessage(chatId, { text: uso(prefijo) });
        }

        let modo = 'usuario';
        const modoNombre = consulta.match(/^nombre\s*:?\s*(.+)$/i);
        if (modoNombre) {
            modo = 'nombre';
            consulta = modoNombre[1].trim();
        } else if (/\s/.test(consulta)) {
            modo = 'nombre';
        }

        const marcarCooldown = () => {
            cooldowns.set(remitente, ahora);
            if (cooldowns.size > 500) {
                for (const [clave, marca] of cooldowns) {
                    if (ahora - marca > COOLDOWN_MS) cooldowns.delete(clave);
                }
            }
        };

        if (modo === 'nombre') {
            if (!/^[\p{L}\p{M}'’ .-]{2,60}$/u.test(consulta)) {
                return sock.sendMessage(chatId, {
                    text: `⚠️ Nombre inválido.\n\nEscribe solo el nombre (letras, espacios, apóstrofes o guiones).\nEj: ${prefijo}osint nombre Juan Pérez`
                });
            }

            marcarCooldown();
            const fuentes = await buscarNombre(consulta);
            const lineas = [
                '🔎 *DARHEART OSINT — BÚSQUEDA PÚBLICA*',
                `👤 Nombre: *${consulta}*`,
                ''
            ];

            const vistos = new Set();
            const entradas = [];
            for (const entrada of [...fuentes.wiki, ...fuentes.wikidata]) {
                const clave = entrada.titulo.toLowerCase();
                if (vistos.has(clave)) continue;
                vistos.add(clave);
                entradas.push(entrada);
            }

            if (entradas.length > 0) {
                lineas.push('📚 *Coincidencias en fuentes abiertas:*');
                for (const entrada of entradas.slice(0, 6)) {
                    lineas.push(`• *${entrada.titulo}* — ${entrada.url}`);
                    if (entrada.detalle) lineas.push(`  _${entrada.detalle}_`);
                }
            } else {
                lineas.push('📚 *Sin coincidencias directas en Wikipedia/Wikidata.*');
            }

            lineas.push('');
            lineas.push('🌐 *Enlaces de búsqueda pública:*');

            for (const [nombre, url] of enlacesNombre(consulta)) {
                lineas.push(`• ${nombre} — ${url}`);
            }

            lineas.push('');
            lineas.push('💡 _Usa comillas en el buscador para coincidencia exacta._');
            lineas.push('ℹ️ _Solo fuentes públicas. No se recopilan ni almacenan datos personales._');

            return sock.sendMessage(chatId, { text: lineas.join('\n') });
        }

        const usuario = consulta;
        if (!/^[A-Za-z0-9._-]{2,32}$/.test(usuario)) {
            return sock.sendMessage(chatId, {
                text: `⚠️ Usuario inválido.\n\nUsa de 2 a 32 caracteres: letras, números, punto, guion o guion bajo.\nEj: ${prefijo}osint janndel\nPara buscar un nombre: ${prefijo}osint nombre Juan Pérez`
            });
        }

        marcarCooldown();

        const claveCache = usuario.toLowerCase();
        let resultados;
        const guardado = cache.get(claveCache);

        if (guardado && ahora - guardado.marca < CACHE_MS) {
            resultados = guardado.resultados;
        } else {
            resultados = await conLimite(SITIOS, 5, async (sitio) => {
                try {
                    return { sitio, estado: await sitio.check(usuario) };
                } catch {
                    return { sitio, estado: null };
                }
            });

            cache.set(claveCache, { marca: ahora, resultados });
            if (cache.size > 200) {
                for (const [clave, valor] of cache) {
                    if (ahora - valor.marca > CACHE_MS) cache.delete(clave);
                }
            }
        }

        const encontrados = resultados.filter(r => r.estado === true);
        const descartados = resultados.filter(r => r.estado === false);
        const desconocidos = resultados.filter(r => r.estado === null);

        const lineas = [
            '🕵️ *DARHEART OSINT*',
            `🔎 Usuario: *@${usuario}*`,
            ''
        ];

        if (encontrados.length > 0) {
            lineas.push(`✅ *Perfiles públicos encontrados (${encontrados.length}):*`);
            for (const { sitio } of encontrados) {
                lineas.push(`• ${sitio.nombre} — ${sitio.url(usuario)}`);
            }
        } else {
            lineas.push('✅ *Sin coincidencias verificables en las fuentes automáticas.*');
        }

        if (descartados.length > 0) {
            lineas.push('');
            lineas.push(`❌ *No encontrado en:* ${descartados.map(r => r.sitio.nombre).join(', ')}`);
        }

        if (desconocidos.length > 0) {
            lineas.push('');
            lineas.push(`❓ *Sin verificar (bloqueo o límite):* ${desconocidos.map(r => r.sitio.nombre).join(', ')}`);
        }

        lineas.push('');
        lineas.push('🔗 *Revisar manualmente:*');
        for (const [nombre, url] of enlacesManuales(usuario)) {
            lineas.push(`• ${nombre} — ${url}`);
        }

        lineas.push('');
        lineas.push('ℹ️ _Solo información pública. No se accede a cuentas privadas ni se elude autenticación. Usa estos datos de forma legal y respetuosa._');

        return sock.sendMessage(chatId, { text: lineas.join('\n') });
    }
};
