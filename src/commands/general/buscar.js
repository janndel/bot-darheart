module.exports = {
    name: 'buscarcmd',
    alias: ['buscarcomando', 'cmdsearch'],
    category: 'general',
    desc: 'Busca comandos por nombre o descripción',
    oculto: true,
    timeout: 15000,
    async execute(sock, msg, args, { chatId, commands }) {
        const consulta = args.join(' ').trim().toLowerCase();
        if (!consulta) {
            return await sock.sendMessage(chatId, {
                text: '🔎 *Uso:* ,buscarcmd <texto>\n\nEjemplo: ,buscarcmd stickers'
            });
        }

        const vistos = new Set();
        const resultados = [];
        for (const cmd of commands?.values?.() || []) {
            if (!cmd || vistos.has(cmd)) continue;
            vistos.add(cmd);
            const textos = [cmd.name, cmd.desc, ...(cmd.alias || [])].filter(Boolean);
            if (!textos.some(t => String(t).toLowerCase().includes(consulta))) continue;
            resultados.push({
                nombre: cmd.name,
                desc: cmd.desc || 'Sin descripción',
                alias: (cmd.alias || []).filter(Boolean).slice(0, 3)
            });
            if (resultados.length >= 20) break;
        }

        if (!resultados.length) {
            return await sock.sendMessage(chatId, {
                text: `🔎 No encontré comandos para *${consulta}*.`
            });
        }

        const lineas = resultados.map((r, i) => {
            const alias = r.alias.length ? `\n   _Alias: ${r.alias.join(', ')}_` : '';
            return `${i + 1}. *${r.nombre}* — ${r.desc}${alias}`;
        });
        await sock.sendMessage(chatId, {
            text: `🔎 *RESULTADOS (${resultados.length})*\n\n${lineas.join('\n\n')}`
        });
    }
};
