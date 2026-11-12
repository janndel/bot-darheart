const downloadQueue = require('../../lib/download-queue');
const { parseHttpUrl } = require('../../lib/url');

function host(url) {
    const parsed = parseHttpUrl(url);
    return parsed ? parsed.hostname : 'enlace';
}

function tiempo(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    return m < 60 ? `${m}m ${s % 60}s` : `${Math.floor(m / 60)}h ${m % 60}m`;
}

module.exports = {
    name: 'cola',
    alias: ['queue', 'descargas'],
    category: 'descargas',
    desc: 'Muestra la cola de descargas',
    oculto: true,
    ownerOnly: true,
    timeout: 30000,
    async execute(sock, msg, args, { chatId }) {
        const { activos, recientes } = downloadQueue.listar(chatId);
        if (!activos.length && !recientes.length) {
            return await sock.sendMessage(chatId, { text: '📭 No hay descargas en cola.' });
        }

        const lineas = ['📥 *COLA DE DESCARGAS*', ''];
        if (activos.length) {
            activos.forEach((job, i) => {
                const pos = i + 1;
                const estado = job.estado === 'running'
                    ? `${job.progreso || 0}%`
                    : `en espera (#${i + 1})`;
                lineas.push(`${pos}. *${host(job.url)}* — ${estado}`);
                if (job.estado === 'running' && job.iniciado) {
                    lineas.push(`   ⏱️ ${tiempo(Date.now() - job.iniciado)}`);
                }
            });
        } else {
            lineas.push('_Nada descargando ahora._');
        }

        if (recientes.length) {
            lineas.push('', '🕘 *Recientes*');
            for (const job of recientes.slice(-5)) {
                const icono = job.estado === 'done' ? '✅' : job.estado === 'cancelled' ? '🚫' : '❌';
                lineas.push(`${icono} ${host(job.url)}`);
            }
        }

        await sock.sendMessage(chatId, { text: lineas.join('\n') });
    }
};
