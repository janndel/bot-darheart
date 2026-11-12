const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const OWNERS = ['75501934751805', '584164659101', '584162662671'];

module.exports = {
    name: 'reiniciar',
    alias: ['restart', 'reboot'],
    async execute(sock, msg, args, { chatId }) {
        const sender = (msg.key.participant || msg.key.remoteJid || chatId).split('@')[0].split(':')[0];
        if (!OWNERS.includes(sender) && !msg.key.fromMe) {
            return await sock.sendMessage(chatId, { text: '🚫 Acceso denegado.' });
        }

        await sock.sendMessage(chatId, {
            text: '🔄 *Reiniciando bot...*\n\n_Se reconectará en unos segundos._'
        });

        console.log('🔄 Reinicio solicitado por owner');

        try {
            const cwd = process.cwd();
            const log = path.join(cwd, 'bot.log');
            try {
                if (fs.existsSync(log) && fs.statSync(log).size > 10 * 1024 * 1024) {
                    fs.renameSync(log, `${log}.1`);
                }
            } catch {}
            const cmd = `sleep 3; cd "${cwd}" && nohup "${process.execPath}" index.js >> "${log}" 2>&1 < /dev/null &`;
            const child = spawn('/bin/sh', ['-c', cmd], { detached: true, stdio: 'ignore' });
            child.unref();
        } catch (e) {
            console.error('❌ No se pudo programar el reinicio:', e.message);
        }

        setTimeout(() => {
            process.exit(0);
        }, 1000);
    }
};
