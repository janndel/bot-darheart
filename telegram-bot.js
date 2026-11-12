require('dotenv').config();
const axios = require('axios');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) {
    console.error('Falta TELEGRAM_BOT_TOKEN en .env');
    process.exit(1);
}

const API = `https://api.telegram.org/bot${TOKEN}`;
let offset = 0;

async function enviarFoto(chatId, url, caption) {
    await axios.post(`${API}/sendPhoto`, new URLSearchParams({
        chat_id: chatId,
        photo: url,
        caption,
        parse_mode: 'Markdown'
    }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 30000
    });
}

async function handleCommand(chatId, text) {
    const args = text.slice(1).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd !== 'rt') return;

    const r18 = args.some(a => a.toLowerCase() === 'r18' || a.toLowerCase() === '+18');
    const url = `https://api.lolicon.app/setu/v2?r18=${r18 ? 1 : 0}`;

    try {
        const res = await axios.get(url, { timeout: 30000 });
        const data = res.data?.data?.[0];
        if (!data) throw new Error('No se recibió imagen');

        const imageUrl = data.urls?.original;
        const titulo = data.title || 'Imagen anime';
        const autor = data.author || 'Desconocido';
        const r18Label = data.r18 ? '🔞 +18' : '🟢 Seguro';
        const caption = `🖼️ *Anime aleatorio*\n\nTítulo: ${titulo}\nAutor: ${autor}\nClasificación: ${r18Label}`;

        await enviarFoto(chatId, imageUrl, caption);
    } catch (error) {
        await axios.post(`${API}/sendMessage`, new URLSearchParams({
            chat_id: chatId,
            text: `❌ Error: ${error.message}`
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).catch(() => {});
    }
}

async function procesar(update) {
    const message = update.message || update.edited_message;
    if (!message || !message.text) return;
    const text = message.text.trim();
    if (!text.startsWith('/') && !text.startsWith(',')) return;
    await handleCommand(message.chat.id, text);
}

async function loop() {
    try {
        const res = await axios.get(`${API}/getUpdates`, {
            params: { offset, limit: 100, timeout: 30 },
            timeout: 40000
        });
        const updates = res.data.result || [];
        for (const upd of updates) {
            offset = upd.update_id + 1;
            await procesar(upd).catch(() => {});
        }
    } catch (e) {
        console.error('poll error:', e.message);
    }
    setImmediate(loop);
}

loop();
console.log('🤖 Bot de Telegram iniciado');
