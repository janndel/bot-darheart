const eco = require('../../lib/eco');

const peces = [
    { nombre: 'Sardina 🐟', valor: 20 },
    { nombre: 'Trucha 🐠', valor: 40 },
    { nombre: 'Bagre 🐡', valor: 60 },
    { nombre: 'Salmón 🍣', valor: 90 },
    { nombre: 'Atún 🐋', valor: 130 },
    { nombre: 'Tiburón 🦈', valor: 200 },
    { nombre: 'Pez Dorado ✨', valor: 350 },
    { nombre: 'Bota Vieja 🥾', valor: 5 }
];

module.exports = {
    name: 'equipopesca',
    alias: ['fish', 'pescar'],
    category: 'economia',
    desc: 'Pescar y ganar coins (5s) · ,equipopesca <apuesta> racha x2-x10',
    async execute(sock, msg, args, { chatId }) {
        if (await eco.soloGrupo(sock, chatId)) return;

        const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
        const num = eco.numero(senderJid);

        const data = eco.cargar();
        const user = eco.usuario(data, chatId, num);
        const ahora = Date.now();
        const cooldown = 5 * 1000;

        if (user.lastFish && ahora - user.lastFish < cooldown) {
            return await sock.sendMessage(chatId, {
                text: `🎣 Espera *${eco.espera(cooldown - (ahora - user.lastFish))}* para pescar de nuevo.`
            });
        }

        const apuesta = eco.apuestaOpcional(args, user);
        if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

        if (apuesta.modo === 'apuesta') {
            const gano = eco.prob(65);
            const res = eco.resolverApuesta(user, apuesta.monto, gano, 'rachaPesca');
            user.lastFish = ahora;
            eco.guardar(data);
            return await sock.sendMessage(chatId, {
                text: gano
                    ? `🎣 *PESCA x${res.multiplicador}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y sacó una buena pieza.\n\n🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*\n\n💰 Total: *${eco.formatear(user.coins)}*`
                    : `🎣 *SE ESCAPÓ*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins y el pez se soltó.\n\n💸 Perdió su apuesta. La racha vuelve a *x2*.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                mentions: [senderJid]
            });
        }

        const pez = eco.elegir(peces);
        user.coins += pez.valor;
        user.lastFish = ahora;
        eco.guardar(data);

        await sock.sendMessage(chatId, {
            text: `🎣 *PESCA*\n\n@${num} pescó: *${pez.nombre}*\n💵 Valor: *${eco.formatear(pez.valor)}* coins\n\n💰 Total: *${eco.formatear(user.coins)}*`,
            mentions: [senderJid]
        });
    }
};
