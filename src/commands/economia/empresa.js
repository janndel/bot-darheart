const eco = require('../../lib/eco');

const COSTO = 10000;
const NOMBRES = ['Emporio DARHEART', 'Café del Grupo', 'Tienda Lunar', 'Tech Solutions', 'La Bodega', 'Estudio Creativo'];
const MAX_NIVEL = 5;

function costoMejora(nivel) {
    return 15000 * nivel;
}

module.exports = {
    name: 'empresa',
    alias: ['negocio', 'business'],
    category: 'economia',
    desc: 'Comprar y administrar tu empresa',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const accion = (args[0] || 'info').toLowerCase();
        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);

        if (accion === 'comprar') {
            if (user.empresa) {
                return await sock.sendMessage(chatId, { text: `⚠️ Ya tienes *${user.empresa.nombre}*. Usa ,empresa cobrar o ,empresa mejorar.` });
            }
            if (user.coins < COSTO) {
                return await sock.sendMessage(chatId, {
                    text: `❌ Necesitas *${eco.formatear(COSTO)}* coins para comprar una empresa. Tienes *${eco.formatear(user.coins)}*.`
                });
            }
            user.coins -= COSTO;
            user.empresa = { nombre: eco.elegir(NOMBRES), nivel: 1, creada: Date.now() };
            user.lastEmpresa = 0;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🏢 *EMPRESA COMPRADA*\n\n@${num} ahora es dueño de *${user.empresa.nombre}* (nivel 1).\n\n💰 Balance: *${eco.formatear(user.coins)}*\n\n_Usa:_ ,empresa cobrar`,
                mentions: [senderJid]
            });
        }

        if (accion === 'cobrar') {
            if (!user.empresa) {
                return await sock.sendMessage(chatId, { text: `⚠️ No tienes empresa. Cómprala con ,empresa comprar (${eco.formatear(COSTO)} coins).` });
            }
            const ahora = Date.now();
            const cooldown = 5 * 1000;
            if (user.lastEmpresa && ahora - user.lastEmpresa < cooldown) {
                return await sock.sendMessage(chatId, {
                    text: `🏢 Las ventas van bien, pero vuelve en *${eco.espera(cooldown - (ahora - user.lastEmpresa))}* para cobrar.`
                });
            }
            const ganancia = eco.azar(800, 2000) + (user.empresa.nivel - 1) * 300;
            user.coins += ganancia;
            user.lastEmpresa = ahora;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🏢 *GANANCIAS DE EMPRESA*\n\n@${num} cobró *${eco.formatear(ganancia)}* coins de *${user.empresa.nombre}*.\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        if (accion === 'mejorar') {
            if (!user.empresa) {
                return await sock.sendMessage(chatId, { text: '⚠️ No tienes empresa. Compra una primero.' });
            }
            if (user.empresa.nivel >= MAX_NIVEL) {
                return await sock.sendMessage(chatId, { text: `⚠️ *${user.empresa.nombre}* ya está en el nivel máximo (${MAX_NIVEL}).` });
            }
            const precio = costoMejora(user.empresa.nivel);
            if (user.coins < precio) {
                return await sock.sendMessage(chatId, {
                    text: `❌ Mejorar cuesta *${eco.formatear(precio)}* coins. Tienes *${eco.formatear(user.coins)}*.`
                });
            }
            user.coins -= precio;
            user.empresa.nivel++;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `📈 *EMPRESA MEJORADA*\n\n@${num} subió *${user.empresa.nombre}* al nivel *${user.empresa.nivel}*.\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        if (accion === 'vender') {
            if (!user.empresa) {
                return await sock.sendMessage(chatId, { text: '⚠️ No tienes empresa que vender.' });
            }
            const reembolso = 6000 + (user.empresa.nivel - 1) * 2500;
            user.coins += reembolso;
            const nombre = user.empresa.nombre;
            delete user.empresa;
            delete user.lastEmpresa;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `💼 *EMPRESA VENDIDA*\n\n@${num} vendió *${nombre}* por *${eco.formatear(reembolso)}* coins.\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        if (!user.empresa) {
            return await sock.sendMessage(chatId, {
                text: `🏢 *EMPRESA*\n\nNo tienes ninguna empresa.\n\n💵 Costo: *${eco.formatear(COSTO)}* coins\n📈 Ingreso: *800 - 2.000* coins cada 6h\n\n_Usa:_ ,empresa comprar`
            });
        }

        const estado = user.lastEmpresa && (Date.now() - user.lastEmpresa) < 12 * 60 * 60 * 1000
            ? `⏰ Próximo cobro en: *${eco.espera(6 * 60 * 60 * 1000 - (Date.now() - user.lastEmpresa))}*`
            : '✅ Puedes cobrar ahora';

        await sock.sendMessage(chatId, {
            text: `🏢 *${user.empresa.nombre}*\n\n👤 Dueño: @${num}\n⭐ Nivel: *${user.empresa.nivel}/${MAX_NIVEL}*\n💵 Ingreso: *${eco.formatear(800 + (user.empresa.nivel - 1) * 300)} - ${eco.formatear(2000 + (user.empresa.nivel - 1) * 300)}* coins\n${estado}\n\n_Comandos:_ ,empresa cobrar | mejorar | vender`,
            mentions: [senderJid]
        });
    }
};
