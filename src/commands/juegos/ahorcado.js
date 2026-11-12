const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs');
const path = require('path');
const FILE = path.join(process.env.HOME, 'ahorcado.json');

function cargar() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return {}; } }
function guardar(d) { writeJsonAtomic(FILE, d); }

const PALABRAS = ['VENEZUELA', 'WHATSAPP', 'TELEFONO', 'COMPUTADORA', 'ELEFANTE', 'BICICLETA', 'CHOCOLATE', 'MARIPOSA', 'GUITARRA', 'ASTRONAUTA', 'BIBLIOTECA', 'DINOSAURIO', 'UNIVERSO', 'PIRAMIDE', 'TELESCOPIO'];

module.exports = {
    name: 'ahorcado',
    alias: ['hangman', 'ahorcao'],
    category: 'juegos',
    desc: 'Juego del ahorcado',
    async execute(sock, msg, args, { chatId }) {
        if (!chatId.endsWith('@g.us')) return await sock.sendMessage(chatId, { text: '⚠️ Solo en grupos.' });
        const accion = (args[0] || '').toLowerCase();
        const data = cargar();
        const juego = data[chatId];

        if (accion === 'rendirse' || accion === 'cancelar') {
            if (juego) { delete data[chatId]; guardar(data); }
            return await sock.sendMessage(chatId, { text: '🏳️ Juego cancelado.' });
        }

        if (!juego || accion === 'nuevo') {
            const palabra = PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
            data[chatId] = { palabra, letras: [], intentos: 6 };
            guardar(data);
            const mostrar = palabra.split('').map(() => '⬜').join(' ');
            return await sock.sendMessage(chatId, {
                text: `🎮 *AHORCADO*\n\n${mostrar}\n\n❤️ Intentos: 6\n\n_Escribe una letra para empezar._`
            });
        }

        const letra = (args[0] || '').toUpperCase();
        if (!/^[A-ZÑ]$/.test(letra)) return await sock.sendMessage(chatId, { text: '⚠️ Envía una letra.' });
        if (juego.letras.includes(letra)) return await sock.sendMessage(chatId, { text: `⚠️ Ya usaste la letra *${letra}*.` });

        juego.letras.push(letra);

        if (!juego.palabra.includes(letra)) {
            juego.intentos--;
            if (juego.intentos <= 0) {
                delete data[chatId]; guardar(data);
                return await sock.sendMessage(chatId, {
                    text: `💀 *¡PERDISTE!*\n\nLa palabra era: *${juego.palabra}*`
                });
            }
        }

        const mostrar = juego.palabra.split('').map(l => juego.letras.includes(l) ? l : '⬜').join(' ');

        if (!mostrar.includes('⬜')) {
            delete data[chatId]; guardar(data);
            return await sock.sendMessage(chatId, {
                text: `🎉 *¡GANASTE!*\n\nLa palabra era: *${juego.palabra}*`
            });
        }

        guardar(data);
        await sock.sendMessage(chatId, {
            text: `🎮 *AHORCADO*\n\n${mostrar}\n\n❤️ Intentos: ${juego.intentos}\n📝 Letras usadas: ${juego.letras.join(', ')}`
        });
    }
};
