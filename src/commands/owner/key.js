const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const PREMIUM_FILE = path.join(process.env.HOME, 'premium.json');

// ==========================================
// 🔑 CLAVES PREMIUM (70 en total)
// ==========================================
const CLAVES_VALIDAS = [
    'DARHEART-VIP-001',
    'DARHEART-VIP-002',
    'DARHEART-VIP-003',
    'DARHEART-VIP-004',
    'DARHEART-VIP-005',
    'DARHEART-VIP-006',
    'DARHEART-VIP-007',
    'DARHEART-VIP-008',
    'DARHEART-VIP-009',
    'DARHEART-VIP-010',
    'DARHEART-VIP-011',
    'DARHEART-VIP-012',
    'DARHEART-VIP-013',
    'DARHEART-VIP-014',
    'DARHEART-VIP-015',
    'DARHEART-VIP-016',
    'DARHEART-VIP-017',
    'DARHEART-VIP-018',
    'DARHEART-VIP-019',
    'DARHEART-VIP-020',
    'DARHEART-VIP-021',
    'DARHEART-VIP-022',
    'DARHEART-VIP-023',
    'DARHEART-VIP-024',
    'DARHEART-VIP-025',
    'DARHEART-VIP-026',
    'DARHEART-VIP-027',
    'DARHEART-VIP-028',
    'DARHEART-VIP-029',
    'DARHEART-VIP-030',
    'DARHEART-VIP-031',
    'DARHEART-VIP-032',
    'DARHEART-VIP-033',
    'DARHEART-VIP-034',
    'DARHEART-VIP-035',
    'DARHEART-VIP-036',
    'DARHEART-VIP-037',
    'DARHEART-VIP-038',
    'DARHEART-VIP-039',
    'DARHEART-VIP-040',
    'DARHEART-VIP-041',
    'DARHEART-VIP-042',
    'DARHEART-VIP-043',
    'DARHEART-VIP-044',
    'DARHEART-VIP-045',
    'DARHEART-VIP-046',
    'DARHEART-VIP-047',
    'DARHEART-VIP-048',
    'DARHEART-VIP-049',
    'DARHEART-VIP-050',
    'DARHEART-VIP-051',
    'DARHEART-VIP-052',
    'DARHEART-VIP-053',
    'DARHEART-VIP-054',
    'DARHEART-VIP-055',
    'DARHEART-VIP-056',
    'DARHEART-VIP-057',
    'DARHEART-VIP-058',
    'DARHEART-VIP-059',
    'DARHEART-VIP-060',
    'DARHEART-VIP-061',
    'DARHEART-VIP-062',
    'DARHEART-VIP-063',
    'DARHEART-VIP-064',
    'DARHEART-VIP-065',
    'DARHEART-VIP-066',
    'DARHEART-VIP-067',
    'DARHEART-VIP-068',
    'DARHEART-VIP-069',
    'DARHEART-VIP-070'
];
// ==========================================

function cargar() {
    try { return JSON.parse(fs.readFileSync(PREMIUM_FILE, 'utf8')); }
    catch {
        const inicial = { activos: {}, clavesUsadas: [] };
        writeJsonAtomic(PREMIUM_FILE, inicial);
        return inicial;
    }
}
function guardar(d) { writeJsonAtomic(PREMIUM_FILE, d); }

module.exports = {
    name: 'key',
    alias: ['premium', 'vip'],
    async execute(sock, msg, args, { chatId }) {
        const data = cargar();
        const esPremium = !!data.activos[chatId];

        // Sin argumentos → mostrar estado
        if (args.length === 0) {
            return await sock.sendMessage(chatId, {
                text: `🔑 *SISTEMA PREMIUM - DARHEART*\n\n` +
                      `📊 *Estado actual:* ${esPremium ? '💎 PREMIUM' : '🆓 Gratuito'}\n\n` +
                      `${esPremium 
                        ? '✅ Este chat tiene premium activo.\n' + 
                          `📅 Activado: ${new Date(data.activos[chatId].fecha).toLocaleDateString()}` 
                        : '⚠️ Sin premium.\nUsa ,key <clave> para activarlo.'}\n\n` +
                      `💎 *Beneficios Premium:*\n` +
                      `➺ Música ilimitada (,m ,play)\n` +
                      `➺ Descargas YouTube (,video)\n` +
                      `➺ Descargas TikTok/IG/FB/X\n` +
                      `➺ Menciones masivas (,tag ,aviso)\n\n` +
                      `_Para obtener una clave, contacta al dueño._`
            });
        }

        const clave = args[0].toUpperCase();

        if (!CLAVES_VALIDAS.includes(clave)) {
            return await sock.sendMessage(chatId, {
                text: `❌ *Clave inválida.*\n\n_Verifica que esté bien escrita._`
            });
        }

        if (data.clavesUsadas.includes(clave)) {
            return await sock.sendMessage(chatId, {
                text: `❌ *Esta clave ya fue usada.*\n\n_Cada clave es de un solo uso._`
            });
        }

        // Activar premium
        data.activos[chatId] = {
            fecha: new Date().toISOString(),
            clave: clave
        };
        data.clavesUsadas.push(clave);
        guardar(data);

        await sock.sendMessage(chatId, {
            text: `🎉 *¡PREMIUM ACTIVADO!*\n\n` +
                  `💎 Este chat ahora tiene acceso premium.\n` +
                  `🔑 Clave: \`${clave}\`\n` +
                  `📅 Fecha: ${new Date().toLocaleDateString()}\n\n` +
                  `✅ *Ya pueden usar:*\n` +
                  `➺ ,m / ,play (música)\n` +
                  `➺ ,video (YouTube)\n` +
                  `➺ ,tt ,ig ,fb ,x (descargas)\n` +
                  `➺ ,tag ,aviso (menciones)\n\n` +
                  `_¡Disfruten!_ 🎊`
        });
        console.log(`💎 Premium activado en ${chatId} con clave ${clave}`);
    }
};
