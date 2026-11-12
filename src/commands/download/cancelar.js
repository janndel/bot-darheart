const downloadQueue = require('../../lib/download-queue');

module.exports = {
    name: 'cancelar',
    alias: ['cancel', 'detener'],
    category: 'descargas',
    desc: 'Cancela una descarga en curso o en cola',
    oculto: true,
    ownerOnly: true,
    timeout: 30000,
    async execute(sock, msg, args, { chatId }) {
        const id = args[0];
        let objetivo = id;
        if (!objetivo) {
            const { activos } = downloadQueue.listar(chatId);
            const actual = activos.find(j => j.estado === 'running') || activos[0];
            if (!actual) {
                return await sock.sendMessage(chatId, { text: '📭 No hay ninguna descarga para cancelar.' });
            }
            objetivo = actual.id;
        }

        const res = downloadQueue.cancelar(objetivo, chatId);
        if (!res.ok) {
            return await sock.sendMessage(chatId, { text: `⚠️ ${res.error}` });
        }
        await sock.sendMessage(chatId, {
            text: res.job.estado === 'running' || res.job.estado === 'cancelando'
                ? `🚫 Cancelando descarga #${res.job.id}...`
                : `🚫 Descarga #${res.job.id} cancelada.`
        });
    }
};
