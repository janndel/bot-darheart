const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const SUBBOTS_FILE = path.join(process.env.HOME, 'subbots.json');
const OWNERS = ['75501934751805', '584164659101', '584162662671'];

function esOwner(jid) {
    if (!jid) return false;
    const num = jid.split('@')[0].split(':')[0];
    return OWNERS.includes(num);
}
function cargar() {
    try { return JSON.parse(fs.readFileSync(SUBBOTS_FILE, 'utf8')); }
    catch {
        const inicial = { solicitudes: [], activos: [], clavesUsadas: [] };
        writeJsonAtomic(SUBBOTS_FILE, inicial);
        return inicial;
    }
}
function guardar(d) { writeJsonAtomic(SUBBOTS_FILE, d); }

module.exports = {
    name: 'subadmin',
    alias: ['gestionsub', 'subpanel'],
    category: 'owner',
    desc: 'Panel de sub-bots (solo owner)',
    async execute(sock, msg, args, { chatId }) {
        const sender = (msg.key.participant || msg.key.remoteJid || chatId);
        if (!esOwner(sender) && !msg.key.fromFromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Solo el owner.' });
        }

        const data = cargar();
        const accion = (args[0] || '').toLowerCase();

        // ✅ Ver panel
        if (!accion || accion === 'list' || accion === 'listar') {
            const solicitudes = data.solicitudes || [];
            const activos = data.activos || [];

            let texto = `🤖 *PANEL DE SUB-BOTS*\n👑 _Solo owner_\n\n` +
                        `📊 *Estadísticas:*\n` +
                        `├─ Solicitudes: *${solicitudes.length}*\n` +
                        `├─ Activos: *${activos.length}*\n` +
                        `└─ Límite: *50*\n\n`;

            if (solicitudes.length > 0) {
                texto += `⏳ *Pendientes:*\n`;
                for (const s of solicitudes) {
                    texto += `  ➺ \`${s.clave}\` → +${s.numero}\n`;
                }
                texto += `\n`;
            }

            if (activos.length > 0) {
                texto += `✅ *Activos:*\n`;
                for (const a of activos) {
                    texto += `  ➺ +${a.numero} (${a.estado})\n`;
                }
            }

            texto += `\n📌 *Comandos:*\n` +
                    `,subadmin aprobar <clave>\n` +
                    `,subadmin rechazar <clave>\n` +
                    `,subadmin eliminar <numero>\n`;

            return await sock.sendMessage(chatId, { text: texto });
        }

        // ✅ Aprobar
        if (accion === 'aprobar') {
            const clave = args[1]?.toUpperCase();
            if (!clave) return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,subadmin aprobar <clave>' });

            const idx = data.solicitudes.findIndex(s => s.clave === clave);
            if (idx === -1) return await sock.sendMessage(chatId, { text: `❌ No hay solicitud con clave ${clave}` });

            const sol = data.solicitudes.splice(idx, 1)[0];
            sol.estado = 'activo';
            sol.aprobado = new Date().toISOString();
            data.activos.push(sol);
            guardar(data);

            return await sock.sendMessage(chatId, {
                text: `✅ *SUB-BOT APROBADO*\n\n📱 +${sol.numero}\n🔑 ${clave}\n\n_Ahora ya puede activarse en el hosting._`
            });
        }

        // ✅ Rechazar
        if (accion === 'rechazar') {
            const clave = args[1]?.toUpperCase();
            if (!clave) return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,subadmin rechazar <clave>' });

            const idx = data.solicitudes.findIndex(s => s.clave === clave);
            if (idx === -1) return await sock.sendMessage(chatId, { text: `❌ No hay solicitud con clave ${clave}` });

            data.solicitudes.splice(idx, 1);
            guardar(data);

            return await sock.sendMessage(chatId, { text: `✅ Solicitud ${clave} rechazada.` });
        }

        // ✅ Eliminar
        if (accion === 'eliminar') {
            const numero = args[1]?.replace(/[^0-9]/g, '');
            if (!numero) return await sock.sendMessage(chatId, { text: '⚠️ Uso: ,subadmin eliminar <numero>' });

            const idx = data.activos.findIndex(a => a.numero === numero);
            if (idx === -1) return await sock.sendMessage(chatId, { text: `❌ No existe sub-bot para +${numero}` });

            data.activos.splice(idx, 1);
            guardar(data);

            return await sock.sendMessage(chatId, { text: `✅ Sub-bot +${numero} eliminado.` });
        }

        await sock.sendMessage(chatId, {
            text: `⚠️ Acción no válida.\n\nUsa: ,subadmin\n,subadmin aprobar <clave>\n,subadmin rechazar <clave>\n,subadmin eliminar <numero>`
        });
    }
};
