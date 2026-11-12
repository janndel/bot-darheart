require('dotenv').config();
const fsInicio = require('fs');
const pathInicio = require('path');
try {
    const pidFile = pathInicio.join(__dirname, 'bot.pid');
    if (fsInicio.existsSync(pidFile)) {
        const pidViejo = parseInt(fsInicio.readFileSync(pidFile, 'utf8'), 10);
        if (pidViejo && pidViejo !== process.pid) {
            try {
                process.kill(pidViejo, 0);
                console.log(`⛔ Ya hay otra instancia activa (PID ${pidViejo}). Saliendo para evitar conflicto de sesión.`);
                process.exit(0);
            } catch (e) {}
        }
    }
    fsInicio.writeFileSync(pidFile, `${process.pid}\n`);
} catch (e) {}
try {
    const logInicio = pathInicio.join(__dirname, 'bot.log');
    if (fsInicio.existsSync(logInicio) && fsInicio.statSync(logInicio).size > 10 * 1024 * 1024) {
        fsInicio.renameSync(logInicio, `${logInicio}.1`);
    }
} catch (e) {}
const { makeWASocket, useMultiFileAuthState, DisconnectReason, downloadMediaMessage, Browsers, fetchLatestBaileysVersion } = require('@mrzkyzdnii/baileys');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const os = require('os');
const express = require('express');
const db = require('./db');
const authPersist = require('./authPersist');
const antidel = require('./antidel');
const { readJson, writeJsonAtomic } = require('./src/lib/json-store');
const { puedeEjecutar: puedeEjecutarComando, textoDenegado, esOwner } = require('./src/lib/permissions');
const { limpiarTemporales: limpiarTemporalesStorage } = require('./src/lib/storage');
const { registrarActividad, esAdminEnGrupo, flushActivos } = require('./src/lib/grupo');
const downloadQueue = require('./src/lib/download-queue');
const reminders = require('./src/lib/reminders');
const security = require('./src/lib/security-log');
const ownerAlerts = require('./src/lib/owner-alerts');

// ==========================================
// 🛡️ MANEJO GLOBAL DE ERRORES
// ==========================================
process.on('uncaughtException', (err) => {
    console.error('🚨 UNCAUGHT:', err.message);
});
process.on('unhandledRejection', (reason) => {
    console.error('🚨 REJECTION:', reason);
});
process.on('SIGTERM', async () => {
    try { flushActivos(); } catch (e) {}
    try { if (authPersist) await authPersist.subirAuth(); } catch (e) {}
    try { if (db) await db.subirDatos(); } catch (e) {}
    process.exit(0);
});
process.on('SIGINT', async () => {
    try { flushActivos(); } catch (e) {}
    try { if (authPersist) await authPersist.subirAuth(); } catch (e) {}
    try { if (db) await db.subirDatos(); } catch (e) {}
    process.exit(0);
});
// ==========================================

// ==========================================
// 🌐 SERVIDOR WEB PARA RENDER
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const WEB_TOKEN = process.env.WEB_TOKEN || '';
let estadoBot = { conectado: false, comandos: 0, errores: 0 };

app.use((req, res, next) => {
    if (!WEB_TOKEN || req.path === '/ping') return next();
    const token = req.get('x-web-token') || req.query.token;
    if (token === WEB_TOKEN) return next();
    return res.status(401).send('no autorizado');
});

app.get('/', (req, res) => res.send('DARHEART Bot activo ✅'));
app.get('/ping', (req, res) => res.send('pong'));
app.get('/health', (req, res) => {
    const act = cargarJSON(ACTIVOS_FILE, {});
    let totalMsgs = 0;
    let totalChats = 0;
    for (const chat of Object.values(act)) {
        totalChats++;
        for (const u of Object.values(chat)) {
            totalMsgs += typeof u === 'number' ? u : (u.count || 0);
        }
    }
    res.json({
        status: 'ok',
        conectado: estadoBot.conectado,
        uptime: process.uptime(),
        comandos: estadoBot.comandos,
        errores: estadoBot.errores,
        memoria: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        cola: downloadQueue.listar().activos.length,
        chatsActivos: totalChats,
        mensajesRegistrados: totalMsgs,
        node: process.version,
        pid: process.pid
    });
});
app.get('/menu-image', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(process.env.HOME || '/data/data/com.termux/files/home', 'config_grupos.json'), 'utf8'));
        const base64 = data?.__global__?.menuImagen;
        if (!base64) return res.status(404).send('sin imagen');
        const buffer = Buffer.from(base64, 'base64');
        const tipo = buffer[0] === 0x89 && buffer[1] === 0x50 ? 'image/png' : 'image/jpeg';
        res.set('Cache-Control', 'public, max-age=86400');
        res.type(tipo).send(buffer);
    } catch (error) {
        res.status(404).send('sin imagen');
    }
});
app.post('/owner/panel-demo', async (req, res) => {
    const token = req.get('x-panel-token') || req.query.panel_token;
    if (!process.env.PANEL_TOKEN || token !== process.env.PANEL_TOKEN) {
        return res.status(403).json({ ok: false, error: 'no autorizado' });
    }
    if (!global.__sock) {
        return res.status(503).json({ ok: false, error: 'bot sin conexion' });
    }
    const owners = (process.env.OWNER_NUMBERS || '75501934751805,584164659101,584162662671')
        .split(',').map(n => n.trim()).filter(Boolean);
    const numero = owners.find(n => n.length >= 8 && n.length <= 13) || owners[0];
    const destino = numero.includes('@') ? numero : `${numero.replace(/\D/g, '')}@s.whatsapp.net`;
    const { construirPanel } = require('./src/commands/admin/panel');
    const { enviarRich, NOMBRE_BOT } = require('./src/lib/rich');
    const demo = {
        metadata: { subject: 'DARHEART DEMO' },
        stats: {
            totalMiembros: 147,
            total: 8719,
            promedio: 60,
            top10: [
                { num: '159996927033562', count: 2829 },
                { num: '93300044365845', count: 1232 },
                { num: '64223132541125', count: 932 }
            ]
        },
        admins: [
            { id: '159996927033562@lid' },
            { id: '93300044365845@lid' },
            { id: '584162662671@s.whatsapp.net' }
        ],
        inactivos: [{}],
        filtros: ['🔗 Antilink', '🛡️ ModoAdmin'],
        ultimaActividad: '02:04',
        prefijo: ',',
        esOw: true,
        esAd: true
    };
    const panel = construirPanel(demo);
    res.json({ ok: true, destino, bloques: panel.rich.length, admins: panel.totalAdmins });
    try {
        await enviarRich(global.__sock, destino, panel.rich, {
            disclaimerText: `${NOMBRE_BOT} — Prefijo: ,`,
            footerText: `${NOMBRE_BOT} — by JANNDEL`,
            mentions: panel.adminMenciones
        });
        console.log('✅ Panel demo enviado al owner');
    } catch (e) {
        console.error('❌ Error enviando panel demo:', e.message);
    }
});
app.listen(PORT, HOST, () => console.log(`🌐 Servidor web en ${HOST}:${PORT}`));
// ==========================================

// ==========================================
// ⚙️ CONFIGURACIÓN
// ==========================================
const HOME = process.env.HOME || '/app';
const configFile = path.join(HOME, 'config.json');
const MUTE_FILE = path.join(HOME, 'muted_users.json');
const CONFIG_GRUPOS = path.join(HOME, 'config_grupos.json');
const ACTIVOS_FILE = path.join(HOME, 'activos.json');
const PREMIUM_FILE = path.join(HOME, 'premium.json');
const AUTH_DIR = path.join(HOME, 'auth_info');

const CONFIG_FILES = [
    'config.json', 'menu_config.json', 'premium.json', 'config_grupos.json',
    'activos.json', 'muted_users.json', 'muted_groups.json', 'packname.json',
    'warns.json', 'reglas_grupos.json'
];

const WA_VERSION = [2, 3000, 1043857760];

const COMANDOS_PREMIUM = [
    'm', 'buscar', 'cancion', 'song',
    'play', 'musica', 'ytmp3', 'audio',
    'video', 'ytmp4', 'ytv',
    'tt', 'tiktok', 'ttdl',
    'ig', 'instagram', 'igdl',
    'fb', 'facebook', 'fbdl',
    'x', 'twitter', 'tw',
    'tag', 'todos', 'mention',
    'aviso', 'anuncio', 'comunicado'
];

const PALABRAS_NSFW = [
    'porno', 'porn', 'xxx', 'nsfw', 'onlyfans', 'desnudo', 'desnuda',
    'nude', 'nudes', 'sexo', 'pene', 'vagina', 'masturb', 'orgia', 'orgía',
    'pedofil', 'violac', 'violar', 'follar'
];

const COMANDOS_ACTIVACION = ['activarbot', 'on', 'encender'];

let config;
try { config = JSON.parse(fs.readFileSync(configFile, 'utf8')); }
catch (e) { config = { prefijo: ',' }; fs.writeFileSync(configFile, JSON.stringify(config)); }
config.numeroTelefono = process.env.NUMERO_TELEFONO || '584162662671';

console.log(`📱 Número: ${config.numeroTelefono}`);
console.log(`📂 AUTH: ${AUTH_DIR}`);
// ==========================================

// ==========================================
// 🚫 ANTI-REVISIÓN: una sola sesión para el número configurado
// ==========================================
function soloDigitos(x) { return String(x || '').replace(/\D/g, ''); }

function numeroCoincide(configurado, jid) {
    const a = soloDigitos(configurado);
    const b = soloDigitos(String(jid || '').split('@')[0].split(':')[0]);
    if (!a || !b) return false;
    return a === b || b.endsWith(a) || a.endsWith(b);
}

function sesionEsDelNumero() {
    try {
        const credsFile = path.join(AUTH_DIR, 'creds.json');
        if (!fs.existsSync(credsFile)) return false;
        const creds = JSON.parse(fs.readFileSync(credsFile, 'utf8'));
        if (!creds.registered) return false;
        return numeroCoincide(config.numeroTelefono, creds.me?.id);
    } catch (e) { return false; }
}

function archivarSesionAnterior() {
    try {
        if (fs.existsSync(AUTH_DIR)) {
            const destino = `${AUTH_DIR}.viejo-${Date.now()}`;
            fs.renameSync(AUTH_DIR, destino);
            console.log(`📦 Sesión del número anterior archivada: ${destino}`);
        }
        const backup = path.join(HOME, 'backup_local', 'auth_info.json.gz');
        if (fs.existsSync(backup)) {
            fs.renameSync(backup, `${backup}.viejo-${Date.now()}`);
        }
    } catch (e) { console.error('⚠️ No se pudo archivar la sesión anterior:', e.message); }
}

function prepararSesionDelNumero() {
    try {
        const credsFile = path.join(AUTH_DIR, 'creds.json');
        if (!fs.existsSync(credsFile)) return;
        if (sesionEsDelNumero()) return;
        const creds = JSON.parse(fs.readFileSync(credsFile, 'utf8'));
        if (!creds.registered) return;
        console.log(`🔁 La sesión guardada no pertenece a ${config.numeroTelefono}. Se archivará para vincular el número nuevo.`);
        archivarSesionAnterior();
    } catch (e) {}
}
// ==========================================

function cargarJSON(file) { return readJson(file, {}); }
function guardarJSON(file, data) { return writeJsonAtomic(file, data); }

// ==========================================
// ✅ COPIAR CONFIGS Y COOKIES
// ==========================================
function copiarConfigsDelRepo() {
    for (const file of CONFIG_FILES) {
        const src = path.join(__dirname, file);
        const dest = path.join(HOME, file);
        try {
            if (!fs.existsSync(src)) continue;
            const ex = fs.existsSync(dest);
            const vacio = ex && fs.statSync(dest).size === 0;
            if (!ex || vacio) {
                fs.copyFileSync(src, dest);
                console.log(`📋 ${file}`);
            }
        } catch (e) {}
    }
}

function copiarCookies() {
    const src = path.join(__dirname, 'ck');
    const dest = path.join(HOME, 'storage', 'downloads');
    try {
        if (!fs.existsSync(src)) { console.log('⚠️ Sin carpeta ck'); return; }
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        let n = 0;
        for (const file of fs.readdirSync(src)) {
            if (!file.endsWith('.txt')) continue;
            const destino = path.join(dest, file);
            if (fs.existsSync(destino) && fs.statSync(destino).size > 0) continue;
            fs.copyFileSync(path.join(src, file), destino);
            console.log(`🍪 ${file}`);
            n++;
        }
        console.log(`✅ Cookies: ${n}`);
    } catch (e) { console.log(`⚠️ ${e.message}`); }
}

copiarConfigsDelRepo();
copiarCookies();
// ==========================================

// ==========================================
// 🧠 CACHE GLOBAL DE METADATA DE GRUPOS (TTL 5 min)
// ==========================================
const META_CACHE = new Map();
const META_CACHE_TTL = 5 * 60 * 1000;
async function getMetaCache(chatId) {
    const ahora = Date.now();
    const hit = META_CACHE.get(chatId);
    if (hit && (ahora - hit.ts) < META_CACHE_TTL) return hit.data;
    const sockActual = global.__sock;
    if (!sockActual) return null;
    try {
        const data = await sockActual.groupMetadata(chatId);
        META_CACHE.set(chatId, { data, ts: ahora });
        return data;
    } catch (e) {
        return null;
    }
}

// ==========================================
// 🚦 RATE LIMITING POR USUARIO
// ==========================================
const RATE = new Map();
const RATE_GRUPO = new Map();

function revisarLimite(mapa, clave, maximo) {
    const ahora = Date.now();
    const actual = mapa.get(clave);
    if (!actual || (ahora - actual.inicio) > 60000) {
        mapa.set(clave, { inicio: ahora, count: 1 });
        return true;
    }
    if (actual.count >= maximo) return false;
    actual.count++;
    return true;
}

function puedeEjecutar(userId, chatId) {
    if (!revisarLimite(RATE, userId, 12)) return false;
    if (chatId && !revisarLimite(RATE_GRUPO, chatId, 30)) return false;
    return true;
}

// ==========================================
// 🛡️ ANTI-BANEO: deduplicación y comandos de riesgo
// ==========================================
const ID_PROCESADOS = new Set();
const COLA_IDS = [];

const COMANDOS_RIESGO = new Set([
    'broadcast', 'tag', 'todos', 'mention', 'aviso', 'anuncio', 'comunicado',
    'kickall', 'nuke', 'limpiar-inactivos', 'aprobartodo'
]);
const _riesgoUsado = new Map();
const COOLDOWN_RIESGO_MS = 10 * 60 * 1000;

let WA_VERSION_ACTUAL = WA_VERSION;
async function actualizarVersionWA() {
    try {
        const { version } = await fetchLatestBaileysVersion();
        if (Array.isArray(version) && version.length === 3) {
            const masNueva = version[0] > WA_VERSION[0] ||
                (version[0] === WA_VERSION[0] && version[1] > WA_VERSION[1]) ||
                (version[0] === WA_VERSION[0] && version[1] === WA_VERSION[1] && version[2] >= WA_VERSION[2]);
            if (masNueva) {
                WA_VERSION_ACTUAL = version;
                console.log(`📦 Versión WA: ${version.join('.')}`);
            } else {
                console.log(`📦 Versión WA fija: ${WA_VERSION_ACTUAL.join('.')}`);
            }
        }
    } catch (e) {
        console.log('⚠️ Usando versión WA local');
    }
}

function obtenerIdInteractivo(message) {
    const listId = message.listResponseMessage?.singleSelectReply?.selectedRowId;
    if (listId) return listId;
    const flow = message.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson;
    if (flow) {
        const match = String(flow).match(/(?:menu|cmd):[A-Za-z0-9_-]+/);
        if (match) return match[0];
    }
    const buttonId = message.buttonsResponseMessage?.selectedButtonId;
    if (buttonId) return buttonId;
    const templateId = message.templateButtonReplyMessage?.selectedId;
    if (templateId) return templateId;
    return null;
}
// ==========================================

// ==========================================
// 🧹 LIMPIEZA DE TEMPORALES (cada 30 minutos)
// ==========================================
function limpiarTemporales() {
    const borrados = limpiarTemporalesStorage({ maxAgeMs: 3600000, galeria: true });
    if (borrados.length) console.log(`🧹 Limpiados ${borrados.length} temporales`);
}
setInterval(limpiarTemporales, 30 * 60 * 1000);
// ==========================================

// --- CARGADOR DE COMANDOS ---
const commands = new Map();
function cargarComandos() {
    commands.clear();
    try {
        if (fs.existsSync('./src/commands')) {
            const folders = fs.readdirSync('./src/commands');
            for (const folder of folders) {
                const fp = `./src/commands/${folder}`;
                if (!fs.statSync(fp).isDirectory()) continue;
                for (const file of fs.readdirSync(fp).filter(f => f.endsWith('.js'))) {
                    try {
                        const rutaCmd = `./src/commands/${folder}/${file}`;
                        try {
                            delete require.cache[require.resolve(rutaCmd)];
                        } catch {}
                        const cmd = require(rutaCmd);
                        if (folder === 'admin' && !cmd.category) cmd.category = 'admin';
                        const nombres = [...new Set([cmd.name, ...(cmd.alias || [])].filter(Boolean))];
                        nombres.forEach(n => {
                            const previo = commands.get(n);
                            if (previo && previo !== cmd) {
                                console.log(`⚠️ Colisión de comando "${n}": ${folder}/${file} reemplaza a ${previo.__archivo || 'otro'} `);
                            }
                            if (!cmd.__archivo) cmd.__archivo = `${folder}/${file}`;
                            commands.set(n, cmd);
                        });
                    } catch (err) { console.log(`⚠️ ${folder}/${file}: ${err.message}`); }
                }
            }
        }
        console.log(`✅ Comandos: ${commands.size}`);
    } catch (e) { console.log('⚠️', e.message); }
}
global.recargarComandos = cargarComandos;
cargarComandos();

let intentos = 0;
let ultimoPairing = 0;
const PAIRING_COOLDOWN = 5 * 60 * 1000;

// ✅ Inicializar
(async () => {
    try {
        const ok = await db.conectar();
        if (ok) await db.bajarDatos();
        await authPersist.conectar();
        await authPersist.bajarAuth();
        prepararSesionDelNumero();
        await actualizarVersionWA();
    } catch (e) { console.error('⚠️ Init:', e.message); }
    console.log('🚀 Iniciando...');
    startBot();
})();

// ==========================================
// 📡 STARTBOT CON BACKOFF EXPONENCIAL
// ==========================================
async function startBot() {
    try {
        console.log('📂 Creando auth...');
        const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
        console.log(`📂 Registrado: ${state.creds.registered}`);

        const sock = makeWASocket({
            version: WA_VERSION_ACTUAL,
            logger: pino({ level: 'fatal' }),
            printQRInTerminal: false,
            auth: state,
            browser: Browsers.ubuntu('Chrome'),
            syncFullHistory: false,
            markOnlineOnConnect: false,
            shouldIgnoreJid: (jid) => jid === 'status@broadcast' || (typeof jid === 'string' && jid.endsWith('@newsletter')),
            getMessage: async () => undefined,
            connectTimeoutMs: 60000,
            keepAliveIntervalMs: 30000,
            retryRequestDelayMs: 2000
        });

        console.log('🔌 Socket creado...');
        global.__sock = sock;

        const sendMessageOriginal = sock.sendMessage.bind(sock);

        // 🕒 Cola de envío con ritmo humano (anti-flood / anti-baneo)
        const COLA_ENVIO = [];
        let COLA_ACTIVA = false;
        const ULTIMO_ENVIO_CHAT = new Map();
        let ULTIMO_ENVIO_GLOBAL = 0;
        const MIN_MS_CHAT = 5000;
        const MIN_MS_GLOBAL = 2500;

        // 🛡️ Tope duro de volumen: máximo 250 mensajes por hora (global)
        const ENVIOS_HORA = [];
        const MAX_ENVIOS_HORA = 250;
        function cupoPorHora() {
            const ahora = Date.now();
            while (ENVIOS_HORA.length && (ahora - ENVIOS_HORA[0]) > 3600000) ENVIOS_HORA.shift();
            return ENVIOS_HORA.length < MAX_ENVIOS_HORA;
        }

        const dormir = (ms) => new Promise(r => setTimeout(r, ms));

        function procesarColaEnvio() {
            if (COLA_ACTIVA) return;
            COLA_ACTIVA = true;
            (async () => {
                while (COLA_ENVIO.length > 0) {
                    const job = COLA_ENVIO.shift();
                    const ahora = Date.now();
                    const esperaChat = Math.max(0, (ULTIMO_ENVIO_CHAT.get(job.jid) || 0) + MIN_MS_CHAT - ahora);
                    const esperaGlobal = Math.max(0, ULTIMO_ENVIO_GLOBAL + MIN_MS_GLOBAL - ahora);
                    const espera = Math.max(esperaChat, esperaGlobal);
                    if (espera > 0) await dormir(espera + Math.floor(Math.random() * 1500));
                    while (!cupoPorHora()) await dormir(15000);
                    try {
                        const r = await sendMessageOriginal(job.jid, job.content, job.options);
                        job.resolve(r);
                        ENVIOS_HORA.push(Date.now());
                    } catch (e) {
                        job.reject(e);
                    }
                    ULTIMO_ENVIO_CHAT.set(job.jid, Date.now());
                    ULTIMO_ENVIO_GLOBAL = Date.now();
                }
                COLA_ACTIVA = false;
                if (COLA_ENVIO.length > 0) procesarColaEnvio();
            })().catch(() => { COLA_ACTIVA = false; });
        }

        sock.sendMessage = (jid, content, options = {}) => {
            const tieneMedia = content && (content.audio || content.image || content.video || content.document || content.sticker);
            if (tieneMedia) {
                options = { mediaUploadTimeoutMs: 300000, ...options };
            }
            return new Promise((resolve, reject) => {
                COLA_ENVIO.push({ jid, content, options, resolve, reject });
                if (COLA_ENVIO.length > 200) {
                    const viejo = COLA_ENVIO.shift();
                    viejo.reject(new Error('cola de envío llena'));
                }
                procesarColaEnvio();
            });
        };

        try {
            antidel.createAntiDelete(sock, {
                getConfig: () => cargarJSON(configFile),
                logger: console
            });
        } catch (e) {
            console.error('⚠️ anti-delete:', e.message);
        }

        // 🚫 Rechazar llamadas (evita reportes y bloqueos del número)
        sock.ev.on('call', async (llamadas) => {
            for (const c of llamadas || []) {
                if (c.status === 'offer') {
                    try { await sock.rejectCall(c.id, c.from); } catch (e) {}
                }
            }
        });

        sock.ev.on('creds.update', async () => {
            try {
                await saveCreds();
            } catch (e) {}
        });

        if (!sock.authState.creds.registered && Date.now() - ultimoPairing > PAIRING_COOLDOWN) {
            ultimoPairing = Date.now();
            console.log('⏳ Esperando 15s antes de pedir el código...');
            await new Promise(r => setTimeout(r, 15000));
            try {
                const codigo = await sock.requestPairingCode(config.numeroTelefono);
                console.log(`\n🔑 CÓDIGO DE VINCULACIÓN (${config.numeroTelefono}): ${codigo}\n`);
                console.log('📱 WhatsApp → Ajustes → Dispositivos vinculados → Vincular con número de teléfono\n');
            } catch (e) {
                console.log(`❌ No se pudo generar el código: ${e.message}`);
                ultimoPairing = 0;
            }
        }

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'open') {
                console.log('✅ Bot DARHEART conectado!');
                console.log(`📌 Prefijo: "${config.prefijo}"`);
                estadoBot.conectado = true;
                intentos = 0;
                fs.writeFileSync(path.join(__dirname, 'bot.pid'), `${process.pid}\n`);
                ownerAlerts.setSock(sock);
                reminders.setSock(sock);
                setTimeout(() => {
                    reminders.restaurar(sock).then(n => { if (n) console.log(`⏰ Recordatorios activos: ${n}`); }).catch(() => {});
                }, 90000 + Math.floor(Math.random() * 30000));
                global._floodGraceUntil = Date.now() + 60000;
                global._flood = new Map();
                if (authPersist) setTimeout(() => authPersist.subirAuth().catch(() => {}), 3000);
            } else if (connection === 'close') {
                estadoBot.conectado = false;
                ownerAlerts.setSock(null);
                const sc = lastDisconnect?.error?.output?.statusCode;
                console.log(`❌ Cerrada. Código: ${sc}`);
                if (sc === DisconnectReason.loggedOut) {
                    console.log('🚪 Sesión cerrada por WhatsApp. Reiniciando proceso para re-vincular...');
                    setTimeout(() => process.exit(1), 5000);
                    return;
                }
                intentos++;
                const base = Math.min(5000 * Math.pow(2, intentos - 1), 300000);
                const delay = base + Math.floor(Math.random() * 5000);
                console.log(`🔄 Reintento en ${Math.round(delay / 1000)}s...`);
                setTimeout(() => startBot().catch(() => {}), delay);
            }
        });

        // Watchdog (sin presencia: un bot "siempre en línea" levanta sospecha)
        const watchdog = setInterval(async () => {
            if (!estadoBot.conectado) return;
            try {
                const ws = sock.ws;
                if (ws && ws.readyState !== 1) throw new Error('socket cerrado');
            } catch (e) {
                clearInterval(watchdog);
                try { sock.end(undefined); } catch (e) {}
            }
        }, 5 * 60 * 1000);

        // 👋 BIENVENIDA / DESPEDIDA
        sock.ev.on('group-participants.update', async (update) => {
            try {
                const { id: chatId, participants, action } = update;
                if (!chatId.endsWith('@g.us')) return;
                const gc = cargarJSON(CONFIG_GRUPOS)[chatId] || {};
                let metadata; try { metadata = await sock.groupMetadata(chatId); } catch { return; }
                for (const user of participants) {
                    const uNum = user.split('@')[0].split(':')[0];
                    let plant = '';
                    if (action === 'add' && gc.bienvenida) plant = gc.bienvenida;
                    else if (action === 'remove' && gc.despedida) plant = gc.despedida;
                    else continue;
                    const texto = plant.replace(/{user}/g, `@${uNum}`).replace(/{grupo}/g, metadata.subject);
                    try { await sock.sendMessage(chatId, { text: texto, mentions: [user] }); } catch (e) {}
                }
            } catch (e) {}
        });

        // 📩 MENSAJES
        sock.ev.on('messages.upsert', async (m) => {
            try {
                const msg = m.messages[0];
                if (!msg.message) return;
                if (msg.key.remoteJid === 'status@broadcast') return;
                if (msg.key.remoteJid === 'broadcast') return;

                // 🛡️ Ignorar duplicados (Baileys puede reenviar al reconectar)
                if (msg.key?.id) {
                    if (ID_PROCESADOS.has(msg.key.id)) return;
                    ID_PROCESADOS.add(msg.key.id);
                    COLA_IDS.push(msg.key.id);
                    if (COLA_IDS.length > 3000) ID_PROCESADOS.delete(COLA_IDS.shift());
                }

                // 🛡️ Ignorar mensajes viejos (backlog tras reconexión = ráfaga de envíos = ban)
                const tsRaw = msg.messageTimestamp;
                const tsMsg = Number(tsRaw && tsRaw.toNumber ? tsRaw.toNumber() : tsRaw) * 1000;
                if (tsMsg > 0 && (Date.now() - tsMsg) > 180000) return;

                let text = msg.message.conversation || msg.message.extendedTextMessage?.text ||
                             msg.message.imageMessage?.caption || msg.message.videoMessage?.caption || '';
                for (const tipo of ['listResponseMessage', 'buttonsResponseMessage', 'templateButtonReplyMessage', 'interactiveResponseMessage']) {
                    if (msg.message[tipo]) console.log(`🔘 ${tipo}:`, JSON.stringify(msg.message[tipo]).slice(0, 700));
                }
                const idInteractivo = obtenerIdInteractivo(msg.message);
                if (idInteractivo) console.log(`🔘 Interactivo recibido: ${idInteractivo}`);
                if (idInteractivo?.startsWith('menu:')) {
                    text = `${config.prefijo}menu ${idInteractivo.slice(5)}`;
                } else if (idInteractivo?.startsWith('cmd:')) {
                    text = `${config.prefijo}menu info ${idInteractivo.slice(4)}`;
                }
                const jidOriginal = msg.key.remoteJid;
                const chatId = (jidOriginal?.endsWith('@lid') && msg.key.remoteJidAlt) ? msg.key.remoteJidAlt : jidOriginal;
                const sender = msg.key.participant || msg.key.remoteJid;
                const senderNum = sender.split('@')[0].split(':')[0];
                const soloNum = (j) => j.split('@')[0].split(':')[0];
                if (text.startsWith(config.prefijo)) console.log(`📩 Comando de ${jidOriginal} -> ${chatId}: ${text.slice(0, 120)}`);

                const gc = cargarJSON(CONFIG_GRUPOS)[chatId] || {};

                // Bot desactivado
                if (chatId.endsWith('@g.us') && gc.botActivo === false) {
                    const cmdCheck = text.startsWith(config.prefijo)
                        ? text.slice(config.prefijo.length).trim().split(/ +/)[0].toLowerCase() : '';
                    if (!text.startsWith(config.prefijo) || !COMANDOS_ACTIVACION.includes(cmdCheck)) return;
                }

                // Contador activos (con timestamps)
                if (chatId.endsWith('@g.us') && text && !text.startsWith(config.prefijo) && !msg.key.fromMe) {
                    const quien = msg.key.participant;
                    if (quien && quien !== chatId) registrarActividad(chatId, quien, 1);
                }

                // Auto-mute
                if (chatId.endsWith('@g.us')) {
                    try {
                        const mute = cargarJSON(MUTE_FILE);
                        const muteados = mute[chatId] || [];
                        if (muteados.includes(senderNum)) {
                            const tl = text.toLowerCase();
                            const esDes = tl.startsWith(config.prefijo + 'desmutear') || tl.startsWith(config.prefijo + 'unmute') || tl.startsWith(config.prefijo + 'activar');
                            if (!esDes) {
                                try { await sock.sendMessage(chatId, { delete: { remoteJid: chatId, fromMe: false, id: msg.key.id, participant: sender } }); } catch (e) {}
                                return;
                            }
                        }
                    } catch (e) {}
                }

                // Filtros de grupo
                if (chatId.endsWith('@g.us') && !msg.key.fromMe && !text.startsWith(config.prefijo)) {
                    const esAdmin = async () => {
                        try {
                            const meta = await getMetaCache(chatId);
                            if (!meta) return false;
                            return meta.participants.find(p => soloNum(p.id) === senderNum)?.admin;
                        } catch { return false; }
                    };

                    // Antilink
                    if (gc.antilink) {
                        const re = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(chat\.whatsapp\.com\/[^\s]+)/i;
                        if (re.test(text) && !(await esAdmin())) {
                            try { await sock.sendMessage(chatId, { delete: { remoteJid: chatId, fromMe: false, id: msg.key.id, participant: sender } }); } catch (e) {}
                            await sock.sendMessage(chatId, { text: `🚫 @${senderNum}, no se permiten enlaces.`, mentions: [sender] });
                            return;
                        }
                    }

                    // Palabras prohibidas
                    const banned = gc.banned || [];
                    if (banned.length > 0) {
                        const tl = text.toLowerCase();
                        if (banned.some(w => tl.includes(w.toLowerCase())) && !(await esAdmin())) {
                            try { await sock.sendMessage(chatId, { delete: { remoteJid: chatId, fromMe: false, id: msg.key.id, participant: sender } }); } catch (e) {}
                            await sock.sendMessage(chatId, { text: `🚫 @${senderNum}, palabra prohibida.`, mentions: [sender] });
                            return;
                        }
                    }

                    // NSFW
                    if (gc.nsfw) {
                        const tl = text.toLowerCase();
                        if (PALABRAS_NSFW.some(w => tl.includes(w)) && !(await esAdmin())) {
                            try { await sock.sendMessage(chatId, { delete: { remoteJid: chatId, fromMe: false, id: msg.key.id, participant: sender } }); } catch (e) {}
                            await sock.sendMessage(chatId, { text: `🔞 @${senderNum}, contenido NSFW.`, mentions: [sender] });
                            return;
                        }
                    }

                    // Antiflood (ignora mensajes atrasados y ráfagas al reconectar)
                    if (gc.antiflood && !(await esAdmin()) && Date.now() >= (global._floodGraceUntil || 0)) {
                        const ahora = Date.now();
                        const tsRaw = msg.messageTimestamp;
                        const ts = Number(tsRaw && tsRaw.toNumber ? tsRaw.toNumber() : tsRaw) * 1000;
                        const t = ts > 0 ? ts : ahora;
                        const viejo = ts > 0 && (ahora - ts) > 60000;
                        if (!viejo) {
                            const key = `${chatId}:${senderNum}`;
                            if (!global._flood) global._flood = new Map();
                            const info = global._flood.get(key) || { count: 0, inicio: t };
                            if ((t - info.inicio) > 5000) { info.count = 1; info.inicio = t; }
                            else info.count++;
                            global._flood.set(key, info);
                            if (info.count > 5) {
                                try { await sock.sendMessage(chatId, { delete: { remoteJid: chatId, fromMe: false, id: msg.key.id, participant: sender } }); } catch (e) {}
                                await sock.sendMessage(chatId, { text: `🚫 @${senderNum}, no hagas flood.`, mentions: [sender] });
                                return;
                            }
                        }
                    }

                    // Antisticker
                    if (gc.antisticker && msg.message.stickerMessage && !(await esAdmin())) {
                        try { await sock.sendMessage(chatId, { delete: { remoteJid: chatId, fromMe: false, id: msg.key.id, participant: sender } }); } catch (e) {}
                        await sock.sendMessage(chatId, { text: `🚫 @${senderNum}, no se permiten stickers.`, mentions: [sender] });
                        return;
                    }

                    // Antimedia
                    if (gc.antimedia && (msg.message.imageMessage || msg.message.videoMessage) && !(await esAdmin())) {
                        try { await sock.sendMessage(chatId, { delete: { remoteJid: chatId, fromMe: false, id: msg.key.id, participant: sender } }); } catch (e) {}
                        await sock.sendMessage(chatId, { text: `🚫 @${senderNum}, no se permiten fotos/videos.`, mentions: [sender] });
                        return;
                    }
                }

                // Comandos
                if (text.startsWith(config.prefijo)) {
                    const args = text.slice(config.prefijo.length).trim().split(/ +/);
                    const cmdName = args.shift().toLowerCase();

                    if (!puedeEjecutar(sender, chatId)) {
                        security.registrar('rate_limit', { usuario: sender, chat: chatId, comando: cmdName });
                        return await sock.sendMessage(chatId, {
                            text: `🚦 @${senderNum}, ve más despacio.`,
                            mentions: [sender]
                        });
                    }

                    if (chatId.endsWith('@g.us') && COMANDOS_PREMIUM.includes(cmdName)) {
                        const premium = cargarJSON(PREMIUM_FILE);
                        if (!premium.activos?.[chatId]) {
                            return await sock.sendMessage(chatId, {
                                text: `💎 *FUNCIÓN PREMIUM*\n\n${config.prefijo}${cmdName} requiere premium.\n\n🔑 ,key <clave>`
                            });
                        }
                    }

                    if (chatId.endsWith('@g.us') && gc.modoadmin) {
                        const libres = ['menu', 'ping', 'bot', 'botlist', 'status', 'perfil', 'pfp', 'fotogrupo', 'gpfp', 'red', 'consejo', 'reglas', 'key', 'sticker', 's', 'qr', 'say', '8ball'];
                        if (!libres.includes(cmdName)) {
                            const meta = await getMetaCache(chatId);
                            const sEnG = meta.participants.find(p => soloNum(p.id) === senderNum);
                            if (!sEnG?.admin) {
                                return await sock.sendMessage(chatId, {
                                    text: `⚠️ @${senderNum}, solo admins.`,
                                    mentions: [sender]
                                });
                            }
                        }
                    }

                    if (COMANDOS_RIESGO.has(cmdName)) {
                        const claveRiesgo = `${cmdName}:${chatId}`;
                        const ultimo = _riesgoUsado.get(claveRiesgo) || 0;
                        if (Date.now() - ultimo < COOLDOWN_RIESGO_MS) {
                            const restante = Math.ceil((COOLDOWN_RIESGO_MS - (Date.now() - ultimo)) / 60000);
                            return await sock.sendMessage(chatId, {
                                text: `🛡️ *Protección anti-baneo*\n\nEse comando masivo está en enfriamiento. Espera ${restante} min.`
                            });
                        }
                        _riesgoUsado.set(claveRiesgo, Date.now());
                    }

                    const command = commands.get(cmdName);
                    if (command) {
                        if (chatId.endsWith('@g.us') && command.category === 'admin' && !esOwner(sock, msg)) {
                            const esAdmin = await esAdminEnGrupo(sock, chatId, sender);
                            if (!esAdmin) {
                                security.registrar('permiso_denegado', {
                                    usuario: sender,
                                    chat: chatId,
                                    comando: cmdName,
                                    detalle: 'noAdmin'
                                });
                                return await sock.sendMessage(chatId, {
                                    text: `⚠️ @${senderNum}, este comando es solo para administradores.`,
                                    mentions: [sender]
                                });
                            }
                        }
                        if (!puedeEjecutarComando(command, sock, msg, chatId)) {
                            security.registrar('permiso_denegado', {
                                usuario: sender,
                                chat: chatId,
                                comando: cmdName,
                                detalle: command.ownerOnly || command.category === 'owner' ? 'ownerOnly' : 'selfOnly'
                            });
                            return await sock.sendMessage(chatId, { text: textoDenegado(command) });
                        }
                        try {
                            const limite = Number(command.timeout) || 90000;
                            await Promise.race([
                                command.execute(sock, msg, args, { chatId, config, configFile, fs, downloadMediaMessage, commands }),
                                new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout')), limite))
                            ]);
                            estadoBot.comandos++;
                        } catch (error) {
                            estadoBot.errores++;
                            console.error(`❌ ${cmdName}:`, error.message);
                            await sock.sendMessage(chatId, { text: `❌ ${error.message.slice(0, 100)}` }).catch(() => {});
                        }
                    }
                }
            } catch (e) {
                estadoBot.errores++;
                console.error('🚨 Error upsert:', e.message);
            }
        });

    } catch (e) {
        console.error('🚨 Error startBot:', e.message);
        intentos++;
        const base = Math.min(5000 * Math.pow(2, intentos - 1), 300000);
        const delay = base + Math.floor(Math.random() * 5000);
        setTimeout(() => startBot().catch(() => {}), delay);
    }
}

// ==========================================
// 💾 AUTO-BACKUP CADA 10 MIN
// ==========================================
setInterval(async () => {
    try { if (db) await db.subirDatos(); } catch (e) {}
    try { if (authPersist) await authPersist.subirAuth(); } catch (e) {}
}, 60 * 60 * 1000);
// ==========================================
