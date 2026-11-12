const eco = require('../../lib/eco');

const ANIMALES = [
    { nombre: 'Conejo 🐇', valor: 30 },
    { nombre: 'Zorro 🦊', valor: 60 },
    { nombre: 'Jabalí 🐗', valor: 100 },
    { nombre: 'Ciervo 🦌', valor: 150 },
    { nombre: 'Lobo 🐺', valor: 220 },
    { nombre: 'Oso 🐻', valor: 320 },
    { nombre: 'Águila 🦅', valor: 400 }
];

module.exports = {
    name: 'cazar',
    alias: ['caza', 'hunt'],
    category: 'economia',
    desc: 'Cazar y ganar coins (5s) · ,cazar <apuesta> racha x2-x10',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastCaza && ahora - user.lastCaza < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `🏹 Estás recuperando el aliento. Vuelve en *${eco.espera(cooldown - (ahora - user.lastCaza))}*.`
            });
        }

        const apuesta = eco.apuestaOpcional(args, user);
        if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

        user.lastCaza = ahora;

        if (apuesta.modo === 'apuesta') {
            const gano = eco.prob(60);
            const res = eco.resolverApuesta(user, apuesta.monto, gano, 'rachaCaza');
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: gano
                    ? `🏹 *CAZA x${res.multiplicador}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y cobró una presa.\n\n🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*\n\n💰 Total: *${eco.formatear(user.coins)}*`
                    : `🌫️ *CAZA FALLIDA*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y volvió con las manos vacías.\n\n💸 Perdió su apuesta. La racha vuelve a *x2*.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        if (eco.prob(12)) {
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🌫️ *CAZA FALLIDA*\n\n@${num} salió de cacería pero no encontró nada.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        const presa = eco.elegir(ANIMALES);
        user.coins += presa.valor;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🏹 *CAZA EXITOSA*\n\n@${num} cazó un *${presa.nombre}*\n💵 Valor: *${eco.formatear(presa.valor)}* coins\n\n💰 Total: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
