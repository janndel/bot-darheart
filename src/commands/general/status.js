const downloadQueue = require('../../lib/download-queue');
const { espacio, formatearBytes } = require('../../lib/storage');

module.exports = {
    name: 'status',
    alias: ['almacenamiento', 'espacio', 'estado', 'storage'],
    async execute(sock, msg, args, { chatId, config }) {
        const uptime = process.uptime();
        const horas = Math.floor(uptime / 3600);
        const minutos = Math.floor((uptime % 3600) / 60);
        const segundos = Math.floor(uptime % 60);

        const memUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const memTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
        const disco = espacio();
        const usados = disco.total ? Math.round((disco.usado / disco.total) * 100) : 0;
        const cola = downloadQueue.listar(chatId).activos.length;

        const texto = 
            `🤖 *DARHEART BOT - STATUS*\n\n` +
            `📌 *Prefijo:* ${config.prefijo}\n` +
            `⏱️ *Uptime:* ${horas}h ${minutos}m ${segundos}s\n` +
            `💾 *RAM:* ${memUsed} MB / ${memTotal} MB\n` +
            `🗄️ *Disco:* ${formatearBytes(disco.libre)} libres (${usados}% usado)\n` +
            `📥 *Cola:* ${cola || 'vacía'}\n` +
            `🟢 *Estado:* Online\n` +
            `📱 *Plataforma:* Termux (Android)\n` +
            `👤 *Owner:* JANNDEL`;

        await sock.sendMessage(chatId, { text: texto });
    }
};
