const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const SUBBOTS_FILE = path.join(process.env.HOME, 'subbots.json');
const CLAVES_SUB_FILE = path.join(process.env.HOME, 'claves_sub.json');

// ✅ Claves válidas para activar sub-bots (edítalas aquí)
const CLAVES_SUB = [
    'SUB-JUAN-001',
    'SUB-MARIA-002',
    'SUB-PEDRO-003'
    // Añade más aquí...
];

function cargarSubbots() {
    try { return JSON.parse(fs.readFileSync(SUBBOTS_FILE, 'utf8')); }
    catch { return { activos: {}, clavesUsadas: [] }; }
}
function guardarSubbots(d) { writeJsonAtomic(SUBBOTS_FILE, d); }

module.exports = {
    name: 'subbot',
    alias: ['sub', 'crearsubbot', 'vinculacion'],
    async execute(sock, msg, args, { chatId }) {
        // Solo en privado
        if (chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Este comando solo funciona en privado con el bot.'
            });
        }

        if (args.length === 0) {
            return await sock.sendMessage(chatId, {
                text: `🤖 *SISTEMA DE SUB-BOTS*\n\n` +
                      `_Un sub-bot es una copia de DARHEART que funciona en tu propio WhatsApp._\n\n` +
                      `✅ *Beneficios:*\n` +
                      `➺ Los comandos responden en tu número\n` +
                      `➺ 30 días de duración\n` +
                      `➺ Comandos normales incluidos\n\n` +
                      `🔑 *Para activarlo:*\n` +
                      `,subbot <tu-clave>\n\n` +
                      `_Solicita tu clave al dueño._`
            });
        }

        const clave = args[0].toUpperCase();
        const data = cargarSubbots();

        // ✅ Verificar clave
        if (!CLAVES_SUB.includes(clave)) {
            return await sock.sendMessage(chatId, {
                text: `❌ *Clave inválida.*\n\n_Verifica con el dueño._`
            });
        }

        if (data.clavesUsadas.includes(clave)) {
            return await sock.sendMessage(chatId, {
                text: `❌ *Esta clave ya fue usada.*\n\n_Solicita una nueva al dueño._`
            });
        }

        // ✅ Verificar si ya tiene sub-bot activo
        const senderNum = (msg.key.participant || msg.key.remoteJid).split('@')[0];
        if (data.activos[senderNum]) {
            const vence = new Date(data.activos[senderNum].vence);
            if (vence > new Date()) {
                return await sock.sendMessage(chatId, {
                    text: `⚠️ *Ya tienes un sub-bot activo.*\n\n` +
                          `📅 Vence: ${vence.toLocaleDateString()}\n` +
                          `🔑 Clave usada: \`${data.activos[senderNum].clave}\``
                });
            }
        }

        // ✅ Registrar activación pendiente
        data.activos[senderNum] = {
            clave: clave,
            activado: new Date().toISOString(),
            vence: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            estado: 'pendiente'
        };
        data.clavesUsadas.push(clave);
        guardarSubbots(data);

        await sock.sendMessage(chatId, {
            text: `✅ *Clave validada.*\n\n` +
                  `📞 Ahora necesito tu número de WhatsApp para vincular.\n\n` +
                  `👉 Envía: ,vincular <tu número con código de país>\n` +
                  `Ejemplo: ,vincular 584241234567\n\n` +
                  `_Te daré un código de 8 dígitos para vincular tu WhatsApp._`
        });
        console.log(`🤖 Sub-bot solicitado por ${senderNum} con clave ${clave}`);
    }
};
