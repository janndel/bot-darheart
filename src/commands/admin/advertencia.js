const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');

const FILE = path.join(process.env.HOME, 'warns.json');
function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

const LIMITE = 3;

module.exports = {
    name: 'advertencia',
    alias: ['adv', 'warn'],
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        }

        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mentioned || mentioned.length === 0) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Menciona al usuario.\n\n' +
                      `Uso:\n,adv @user <motivo>\n,adv @user (ver warns)\n,adv reset @user`
            });
        }

        const soloNumero = (jid) => jid.split('@')[0].split(':')[0];
        const userNum = soloNumero(mentioned[0]);
        const data = cargar();
        if (!data[chatId]) data[chatId] = {};

        // Reset warns
        if (args[0]?.toLowerCase() === 'reset') {
            delete data[chatId][userNum];
            guardar(data);
            return await sock.sendMessage(chatId, {
                text: `✅ Warns de @${userNum} reiniciados.`,
                mentions: mentioned
            });
        }

        // Ver warns
        if (args.length === 0) {
            const count = data[chatId][userNum] || 0;
            return await sock.sendMessage(chatId, {
                text: `📊 @${userNum} tiene *${count}/${LIMITE}* advertencias.`,
                mentions: mentioned
            });
        }

        // Añadir warn
        const motivo = args.join(' ');
        data[chatId][userNum] = (data[chatId][userNum] || 0) + 1;
        const total = data[chatId][userNum];
        guardar(data);

        if (total >= LIMITE) {
            try {
                await sock.groupParticipantsUpdate(chatId, [mentioned[0]], 'remove');
                await sock.sendMessage(chatId, {
                    text: `🚫 @${userNum} expulsado por alcanzar *${LIMITE}/${LIMITE}* warns.\n\n_Motivo: ${motivo}_`,
                    mentions: mentioned
                });
                delete data[chatId][userNum];
                guardar(data);
            } catch (e) {
                await sock.sendMessage(chatId, {
                    text: `⚠️ @${userNum} llegó al límite pero no pude expulsarlo: ${e.message}`,
                    mentions: mentioned
                });
            }
        } else {
            await sock.sendMessage(chatId, {
                text: `⚠️ *Advertencia ${total}/${LIMITE}* para @${userNum}\n\n_Motivo: ${motivo}_`,
                mentions: mentioned
            });
        }
    }
};
