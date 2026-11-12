const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'muted_users.json');

function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }
function limpiarJid(jid) { const [n, d] = jid.split('@'); return `${n.split(':')[0]}@${d}`; }

// ✅ Parsear tiempo: 30m, 1h, 2d
function parsearTiempo(str) {
    if (!str) return null;
    const match = str.match(/^(\d+)([mhd])$/i);
    if (!match) return null;
    const num = parseInt(match[1]);
    const unidad = match[2].toLowerCase();
    if (unidad === 'm') return num * 60 * 1000;
    if (unidad === 'h') return num * 60 * 60 * 1000;
    if (unidad === 'd') return num * 24 * 60 * 60 * 1000;
    return null;
}

module.exports = {
    name: 'silenciar',
    alias: ['mutetemp', 'silenciartemp'],
    category: 'admin',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        const mencion = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mencion || mencion.length === 0) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ *Uso:*\n,silenciar <tiempo> @usuario\n\n*Ejemplos:*\n,silenciar 30m @user\n,silenciar 1h @user\n,silenciar 2d @user'
            });
        }

        const tiempo = parsearTiempo(args[0]);
        if (!tiempo) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Formato de tiempo inválido.\n\nUsa: 30m, 1h, 2d'
            });
        }

        const targetJid = limpiarJid(mencion[0]);
        const num = targetJid.split('@')[0];

        // ✅ Añadir al muted_users
        const data = cargar();
        if (!data[chatId]) data[chatId] = [];
        if (!data[chatId].includes(num)) data[chatId].push(num);
        guardar(data);

        const minutos = Math.floor(tiempo / 60000);
        const tiempoTexto = minutos < 60 ? `${minutos} min` : `${Math.floor(minutos / 60)}h`;

        await sock.sendMessage(chatId, {
            text: `🔇 @${num} silenciado por *${tiempoTexto}*.\n\n_Todos sus mensajes serán borrados hasta que se le levante el silencio._`,
            mentions: [targetJid]
        });

        // ✅ Programar desilenciado automático
        setTimeout(() => {
            try {
                const d = cargar();
                if (d[chatId]) {
                    d[chatId] = d[chatId].filter(n => n !== num);
                    if (d[chatId].length === 0) delete d[chatId];
                    guardar(d);
                }
                console.log(`🔊 Auto-desmute de ${num} en ${chatId}`);
                sock.sendMessage(chatId, {
                    text: `🔊 @${num} ya puede escribir, se le levantó el silencio.`,
                    mentions: [targetJid]
                }).catch(() => {});
            } catch (e) {
                console.error('Error auto-desmute:', e.message);
            }
        }, tiempo);

        console.log(`🔇 ${num} silenciado por ${tiempoTexto}`);
    }
};
