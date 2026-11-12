const downloadQueue = require('./download-queue');

async function ejecutarEnCola(sock, chatId, meta, run) {
    const job = downloadQueue.enqueue(
        { chatId, tipo: meta.tipo || 'media', url: meta.url || meta.entrada || '', timeoutMs: meta.timeoutMs },
        async ({ job, reportar, signal }) => {
            job.reportar = reportar;
            return run({ job, reportar, signal });
        }
    );

    const posicion = downloadQueue.posicion(job);
    if (posicion > 1) {
        await sock.sendMessage(chatId, {
            text: `⏳ En cola (#${posicion - 1}). Te aviso cuando empiece.`
        }).catch(() => {});
    }

    try {
        return await job.promise;
    } catch (error) {
        if (job.estado === 'cancelled' || /cancelad/i.test(error.message)) {
            await sock.sendMessage(chatId, { text: '❌ Descarga cancelada.' }).catch(() => {});
            return null;
        }
        throw error;
    }
}

module.exports = { ejecutarEnCola };
