const eco = require('./eco');
const crypto = require('crypto');
const { pools } = require('./pack-data');

const MORSE = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
    I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
    Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..', 0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
    5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.'
};
const MORSE_INV = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

function textoArgs(args) {
    return args.join(' ').trim();
}

function numerosArgs(args) {
    return args.map(a => Number(String(a).replace(',', '.'))).filter(Number.isFinite);
}

function aMorse(texto) {
    return [...texto.toUpperCase()].map(c => (MORSE[c] !== undefined ? MORSE[c] : ' ')).join(' ');
}

function deMorse(texto) {
    return texto.trim().split(/\s+/).map(c => MORSE_INV[c] || '').join('');
}

function rot13(texto) {
    return texto.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
}

function capitalizar(texto) {
    return texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : texto;
}

function titulo(texto) {
    return texto.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}

function ejecutarUtilidad(def, args) {
    const op = def.utilidad;
    const texto = textoArgs(args);
    const nums = numerosArgs(args);
    const uso = (ejemplo) => `⚠️ Uso: ${ejemplo || `,${def.name} <texto>`}`;
    const redondear = (n) => Math.round(n * 100) / 100;

    switch (op) {
        case 'mayus': return texto ? texto.toUpperCase() : uso();
        case 'minus': return texto ? texto.toLowerCase() : uso();
        case 'invertir': return texto ? [...texto].reverse().join('') : uso();
        case 'contar': return texto ? `🔢 Caracteres: *${texto.length}*` : uso();
        case 'palabras': return texto ? `📝 Palabras: *${texto.split(/\s+/).filter(Boolean).length}*` : uso();
        case 'palindromo': {
            if (!texto) return uso();
            const limpio = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
            return limpio === [...limpio].reverse().join('') ? '✅ Sí es un palíndromo.' : '❌ No es un palíndromo.';
        }
        case 'binario': return texto ? [...texto].map(c => c.charCodeAt(0).toString(2)).join(' ') : uso();
        case 'binariodecode': {
            if (!texto) return uso();
            try {
                return texto.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('');
            } catch { return '❌ Binario inválido.'; }
        }
        case 'base64': return texto ? Buffer.from(texto, 'utf8').toString('base64') : uso();
        case 'base64decode': {
            if (!texto) return uso();
            try { return Buffer.from(texto, 'base64').toString('utf8'); } catch { return '❌ Base64 inválido.'; }
        }
        case 'hex': return texto ? Buffer.from(texto, 'utf8').toString('hex') : uso();
        case 'hexdecode': {
            if (!texto) return uso();
            try { return Buffer.from(texto.replace(/\s+/g, ''), 'hex').toString('utf8'); } catch { return '❌ Hex inválido.'; }
        }
        case 'rot13': return texto ? rot13(texto) : uso();
        case 'morse': return texto ? aMorse(texto) : uso();
        case 'morsedecode': return texto ? deMorse(texto) : uso();
        case 'urlencode': return texto ? encodeURIComponent(texto) : uso();
        case 'urldecode': {
            if (!texto) return uso();
            try { return decodeURIComponent(texto); } catch { return '❌ URL inválida.'; }
        }
        case 'md5': return texto ? crypto.createHash('md5').update(texto).digest('hex') : uso();
        case 'sha1': return texto ? crypto.createHash('sha1').update(texto).digest('hex') : uso();
        case 'sha256': return texto ? crypto.createHash('sha256').update(texto).digest('hex') : uso();
        case 'capitalizar': return texto ? capitalizar(texto) : uso();
        case 'titulo': return texto ? titulo(texto) : uso();
        case 'vocales': return texto ? `🔤 Vocales: *${(texto.match(/[aeiouáéíóúü]/gi) || []).length}*` : uso();
        case 'consonantes': return texto ? `🔤 Consonantes: *${(texto.match(/[bcdfghjklmnñpqrstvwxyz]/gi) || []).length}*` : uso();
        case 'repetir': {
            const n = parseInt(args[0], 10);
            const resto = args.slice(1).join(' ');
            if (!Number.isFinite(n) || n < 1 || n > 50 || !resto) return uso(`,${def.name} <1-50> <texto>`);
            return resto.repeat(n);
        }
        case 'aleatorio': {
            const max = Number.isFinite(parseInt(args[0], 10)) ? parseInt(args[0], 10) : 100;
            return `🎲 Número aleatorio: *${eco.azar(1, Math.max(1, max))}*`;
        }
        case 'dado100': return `🎲 Salio *${eco.azar(1, 100)}*`;
        case 'moneda': return `🪙 ${eco.prob(50) ? 'Cara 🌕' : 'Cruz 🌑'}`;
        case 'color': return `🎨 Color: *${eco.elegir(pools.colores)}*`;
        case 'emoji': return `😀 Emoji: ${eco.elegir(pools.emojis)}`;
        case 'animal': return `🐾 Animal: *${eco.elegir(pools.animales)}*`;
        case 'pais': return `🌍 País: *${eco.elegir(pools.paises)}*`;
        case 'nombre': return `👤 Nombre: *${eco.elegir(pools.nombres)}*`;
        case 'apodo': return `🏷️ Apodo: *${eco.elegir(pools.apodos)}*`;
        case 'comida': return `🍽️ Comida: *${eco.elegir(pools.comidas)}*`;
        case 'fecha': return `📅 ${new Date().toLocaleDateString('es-VE')}`;
        case 'hora': return `🕐 ${new Date().toLocaleTimeString('es-VE')}`;
        case 'timestamp': return `⏱️ ${Date.now()}`;
        case 'suma': return nums.length >= 2 ? `➕ Resultado: *${redondear(nums.reduce((a, b) => a + b, 0))}*` : uso(`,${def.name} <n1> <n2>`);
        case 'resta': return nums.length >= 2 ? `➖ Resultado: *${redondear(nums[0] - nums[1])}*` : uso(`,${def.name} <n1> <n2>`);
        case 'multiplicar': return nums.length >= 2 ? `✖️ Resultado: *${redondear(nums.reduce((a, b) => a * b, 1))}*` : uso(`,${def.name} <n1> <n2>`);
        case 'dividir': return nums.length >= 2 ? (nums[1] === 0 ? '❌ No se puede dividir entre cero.' : `➗ Resultado: *${redondear(nums[0] / nums[1])}*`) : uso(`,${def.name} <n1> <n2>`);
        case 'potencia': return nums.length >= 2 ? `🔥 Resultado: *${redondear(Math.pow(nums[0], nums[1]))}*` : uso(`,${def.name} <base> <exponente>`);
        case 'raiz': return nums.length >= 1 ? (nums[0] < 0 ? '❌ No existe raíz real de un negativo.' : `√ Resultado: *${redondear(Math.sqrt(nums[0]))}*`) : uso(`,${def.name} <número>`);
        case 'porcentaje': return nums.length >= 2 ? `📊 ${nums[0]}% de ${nums[1]} = *${redondear(nums[0] / 100 * nums[1])}*` : uso(`,${def.name} <porcentaje> <total>`);
        case 'promedio': return nums.length >= 1 ? `📊 Promedio: *${redondear(nums.reduce((a, b) => a + b, 0) / nums.length)}*` : uso(`,${def.name} <n1> <n2> ...`);
        case 'imc': return nums.length >= 2 ? `⚖️ IMC: *${redondear(nums[0] / (nums[1] * nums[1]))}*` : uso(`,${def.name} <peso kg> <altura m>`);
        case 'regla3': return nums.length >= 3 ? `📐 Resultado: *${redondear(nums[1] * nums[2] / nums[0])}*` : uso(`,${def.name} <a> <b> <c>`);
        case 'iva': return nums.length >= 1 ? `🧾 IVA 16%: *${redondear(nums[0] * 0.16)}* | Total: *${redondear(nums[0] * 1.16)}*` : uso(`,${def.name} <monto>`);
        case 'propina': {
            if (!nums.length) return uso(`,${def.name} <monto> [porcentaje]`);
            const pct = nums[1] || 10;
            return `💸 Propina (${pct}%): *${redondear(nums[0] * pct / 100)}* | Total: *${redondear(nums[0] * (1 + pct / 100))}*`;
        }
        case 'descuento': {
            if (!nums.length) return uso(`,${def.name} <monto> <porcentaje>`);
            const pct = nums[1] || 10;
            return `🏷️ Descuento (${pct}%): *${redondear(nums[0] * pct / 100)}* | Pagas: *${redondear(nums[0] * (1 - pct / 100))}*`;
        }
        case 'kmamillas': return nums.length ? `🛣️ *${redondear(nums[0] * 0.621371)}* millas` : uso(`,${def.name} <km>`);
        case 'millasakm': return nums.length ? `🛣️ *${redondear(nums[0] * 1.60934)}* km` : uso(`,${def.name} <millas>`);
        case 'kglibras': return nums.length ? `⚖️ *${redondear(nums[0] * 2.20462)}* libras` : uso(`,${def.name} <kg>`);
        case 'librasakg': return nums.length ? `⚖️ *${redondear(nums[0] * 0.453592)}* kg` : uso(`,${def.name} <libras>`);
        case 'cmpulgadas': return nums.length ? `📏 *${redondear(nums[0] / 2.54)}* pulgadas` : uso(`,${def.name} <cm>`);
        case 'pulgadasacm': return nums.length ? `📏 *${redondear(nums[0] * 2.54)}* cm` : uso(`,${def.name} <pulgadas>`);
        case 'litrosgalones': return nums.length ? `🧴 *${redondear(nums[0] * 0.264172)}* galones` : uso(`,${def.name} <litros>`);
        case 'galonesalitros': return nums.length ? `🧴 *${redondear(nums[0] * 3.78541)}* litros` : uso(`,${def.name} <galones>`);
        case 'celsiusfahrenheit': return nums.length ? `🌡️ *${redondear(nums[0] * 9 / 5 + 32)}* °F` : uso(`,${def.name} <celsius>`);
        case 'fahrenheitcelsius': return nums.length ? `🌡️ *${redondear((nums[0] - 32) * 5 / 9)}* °C` : uso(`,${def.name} <fahrenheit>`);
        case 'edad': {
            const anio = nums[0];
            if (!anio) return uso(`,${def.name} <año de nacimiento>`);
            return `🎂 Edad aproximada: *${new Date().getFullYear() - anio}* años`;
        }
        case 'ascii': return texto ? [...texto].map(c => c.charCodeAt(0)).join(' ') : uso();
        case 'charcode': return nums.length ? `🔤 Carácter: *${String.fromCharCode(nums[0])}*` : uso(`,${def.name} <código>`);
        default: return '⚠️ Utilidad no disponible.';
    }
}

function crear(def) {
    return {
        name: def.name,
        alias: def.alias || [],
        category: def.category,
        desc: def.desc,
        async execute(sock, msg, args, { chatId }) {
            if (def.soloGrupo !== false) {
                if (await eco.soloGrupo(sock, chatId)) return;
            }

            const senderJid = eco.limpiarJid(msg.key.participant || msg.key.remoteJid);
            const num = eco.numero(senderJid);
            const menciones = eco.mencionados(msg);
            const targetJid = menciones.length ? eco.limpiarJid(menciones[0]) : senderJid;
            const numTarget = eco.numero(targetJid);

            const reemplazar = (texto) => String(texto)
                .replace(/\{user\}/g, `@${num}`)
                .replace(/\{target\}/g, `@${numTarget}`);

            if (def.tipo === 'utilidad') {
                let salida;
                try {
                    salida = ejecutarUtilidad(def, args);
                } catch (error) {
                    salida = `❌ ${error.message}`;
                }
                return await sock.sendMessage(chatId, { text: salida });
            }

            if (def.tipo === 'accion') {
                const texto = reemplazar(eco.elegir(def.textos || [def.texto || '{user} hizo algo con {target}.']));
                return await sock.sendMessage(chatId, {
                    text: `💥 ${texto} ${def.emoji || ''}`.trim(),
                    mentions: [senderJid, targetJid]
                });
            }

            if (def.tipo === 'trabajo') {
                const data = eco.cargar();
                const user = eco.usuario(data, chatId, num);
                const ahora = Date.now();
                const cooldown = 5 * 1000;
                const campo = def.campo || 'lastTrabajoExtra';

                if (user[campo] && ahora - user[campo] < cooldown) {
                    return await sock.sendMessage(chatId, {
                        text: `⏳ Estás cansado. Vuelve a trabajar en *${eco.espera(cooldown - (ahora - user[campo]))}*.`
                    });
                }

                const apuesta = eco.apuestaOpcional(args, user);
                if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

                if (apuesta.modo === 'apuesta') {
                    const gano = eco.prob(def.chance || 60);
                    const res = eco.resolverApuesta(user, apuesta.monto, gano, 'rachaTrabajo');
                    user[campo] = ahora;
                    eco.guardar(data);
                    return await sock.sendMessage(chatId, {
                        text: `${def.emoji || '💼'} *${def.titulo || 'TRABAJO'}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins trabajando como *${def.oficio}*.\n\n${gano ? `🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*` : `💸 Perdió *${eco.formatear(apuesta.monto)}* coins. La racha vuelve a *x2*.`}\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                        mentions: [senderJid]
                    });
                }

                let ganancia = eco.azar(def.min || 40, def.max || 180);
                let extra = '';
                if (Number(user.multiplicador) > 1) {
                    ganancia *= Number(user.multiplicador);
                    extra = `\n✨ Multiplicador x${user.multiplicador} aplicado.`;
                    delete user.multiplicador;
                }

                user.coins += ganancia;
                user[campo] = ahora;
                eco.guardar(data);

                return await sock.sendMessage(chatId, {
                    text: `${def.emoji || '💼'} *${def.titulo || 'TRABAJO'}*\n\n@${num} trabajó como *${def.oficio}* y ganó *${eco.formatear(ganancia)}* coins.${extra}\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                    mentions: [senderJid]
                });
            }

            if (def.tipo === 'delito') {
                const data = eco.cargar();
                const user = eco.usuario(data, chatId, num);
                const ahora = Date.now();
                const cooldown = 5 * 1000;
                const campo = def.campo || 'lastCrimenExtra';

                if (user[campo] && ahora - user[campo] < cooldown) {
                    return await sock.sendMessage(chatId, {
                        text: `🚔 La policía te sigue. Espera *${eco.espera(cooldown - (ahora - user[campo]))}*.`
                    });
                }

                const apuesta = eco.apuestaOpcional(args, user);
                if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

                user[campo] = ahora;
                const exito = eco.prob(def.chance || 55);

                if (apuesta.modo === 'apuesta') {
                    const res = eco.resolverApuesta(user, apuesta.monto, exito, 'rachaDelito');
                    eco.guardar(data);
                    return await sock.sendMessage(chatId, {
                        text: `${def.emoji || '🕵️'} *${def.titulo || 'DELITO'}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins e intentó ${def.delito}.\n\n${exito ? `🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*` : `🚨 Lo atraparon y perdió *${eco.formatear(apuesta.monto)}* coins. La racha vuelve a *x2*.`}\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                        mentions: [senderJid]
                    });
                }

                let texto;
                if (exito) {
                    const ganancia = eco.azar(def.min || 150, def.max || 400);
                    user.coins += ganancia;
                    texto = `${def.emoji || '🕵️'} *GOLPE EXITOSO*\n\n@${num} ${def.delito} y ganó *${eco.formatear(ganancia)}* coins.\n\n💰 Total: *${eco.formatear(user.coins)}*`;
                } else {
                    const multa = eco.azar(def.fineMin || 80, def.fineMax || 250);
                    user.coins = Math.max(0, user.coins - multa);
                    texto = `🚨 *TE ATRAPARON*\n\n@${num} intentó ${def.delito} y recibió una multa de *${eco.formatear(multa)}* coins.\n\n💰 Total: *${eco.formatear(user.coins)}*`;
                }
                eco.guardar(data);
                return await sock.sendMessage(chatId, { text: texto, mentions: [senderJid] });
            }

            if (def.tipo === 'recolectar' || def.tipo === 'recompensa' || def.tipo === 'mendicidad') {
                const data = eco.cargar();
                const user = eco.usuario(data, chatId, num);
                const ahora = Date.now();
                const cooldown = 5 * 1000;
                const campo = def.campo || `last${def.tipo}Extra`;

                if (user[campo] && ahora - user[campo] < cooldown) {
                    return await sock.sendMessage(chatId, {
                        text: `⏳ Todavía no puedes. Vuelve en *${eco.espera(cooldown - (ahora - user[campo]))}*.`
                    });
                }

                const apuesta = eco.apuestaOpcional(args, user);
                if (apuesta.error) return await sock.sendMessage(chatId, { text: apuesta.error });

                user[campo] = ahora;

                if (apuesta.modo === 'apuesta') {
                    const gano = eco.prob(60);
                    const res = eco.resolverApuesta(user, apuesta.monto, gano, 'rachaRecoleccion');
                    eco.guardar(data);
                    return await sock.sendMessage(chatId, {
                        text: `${def.emoji || '🎁'} *${def.titulo || 'APUESTA'}*\n\n@${num} apostó *${eco.formatear(apuesta.monto)}* coins.\n\n${gano ? `🎉 ¡Ganó *${eco.formatear(res.pago)}* coins! (x${res.multiplicador})\n🔥 Próxima victoria seguida: *x${res.siguiente}*` : `💸 Perdió *${eco.formatear(apuesta.monto)}* coins. La racha vuelve a *x2*.`}\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                        mentions: [senderJid]
                    });
                }

                if (def.tipo === 'recolectar') {
                    if (eco.prob(def.fail || 15)) {
                        eco.guardar(data);
                        return await sock.sendMessage(chatId, {
                            text: `🍃 *SIN SUERTE*\n\n@${num} no encontró nada en ${def.lugar}.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                            mentions: [senderJid]
                        });
                    }
                    const [nombre, valor] = eco.elegir(def.items);
                    const valorFinal = eco.azar(valor[0], valor[1]);
                    user.coins += valorFinal;
                    eco.guardar(data);
                    return await sock.sendMessage(chatId, {
                        text: `${def.emoji || '🧭'} *RECOLECCIÓN*\n\n@${num} encontró *${nombre}* en ${def.lugar} y ganó *${eco.formatear(valorFinal)}* coins.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                        mentions: [senderJid]
                    });
                }

                if (eco.prob(def.fail || 10)) {
                    eco.guardar(data);
                    return await sock.sendMessage(chatId, {
                        text: `😔 *NADA DE SUERTE*\n\n@${num} no consiguió nada esta vez.\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                        mentions: [senderJid]
                    });
                }

                const ganancia = eco.azar(def.min || 100, def.max || 500);
                user.coins += ganancia;
                eco.guardar(data);
                return await sock.sendMessage(chatId, {
                    text: `${def.emoji || '🎁'} *${def.titulo || 'RECOMPENSA'}*\n\n@${num} ganó *${eco.formatear(ganancia)}* coins.${def.lugar ? `\n📍 ${def.lugar}` : ''}\n\n💰 Total: *${eco.formatear(user.coins)}*`,
                    mentions: [senderJid]
                });
            }

            if (def.tipo === 'inversion') {
                const data = eco.cargar();
                const user = eco.usuario(data, chatId, num);
                const ahora = Date.now();
                const cooldown = 5 * 1000;
                const campo = def.campo || 'lastInversionExtra';

                if (user[campo] && ahora - user[campo] < cooldown) {
                    return await sock.sendMessage(chatId, {
                        text: `📊 El mercado está cerrado para ti. Vuelve en *${eco.espera(cooldown - (ahora - user[campo]))}*.`
                    });
                }

                const monto = eco.parsearCantidad(args[0], user.coins);
                if (!monto) return await sock.sendMessage(chatId, { text: `⚠️ Uso: ,${def.name} <cantidad|todo> (mínimo 100)` });
                if (monto < 100) return await sock.sendMessage(chatId, { text: '⚠️ La inversión mínima es *100* coins.' });
                if (user.coins < monto) {
                    return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
                }

                user[campo] = ahora;
                user.coins -= monto;
                const tirada = Math.random();
                let retorno = 0;
                let etiqueta = '';

                if (tirada < 0.10) {
                    etiqueta = '💥 Pérdida total.';
                } else if (tirada < 0.35) {
                    retorno = Math.floor(monto * 0.5);
                    etiqueta = '📉 Perdiste el 50%.';
                } else if (tirada < 0.65) {
                    const g = eco.azar(10, 40);
                    retorno = monto + Math.floor(monto * g / 100);
                    etiqueta = `📈 Ganancia del ${g}%.`;
                } else if (tirada < 0.90) {
                    const g = eco.azar(50, 100);
                    retorno = monto + Math.floor(monto * g / 100);
                    etiqueta = `🚀 Ganancia del ${g}%.`;
                } else {
                    const m = eco.azar(2, 3);
                    retorno = monto * m;
                    etiqueta = `🌕 Multiplicaste x${m}.`;
                }

                user.coins += retorno;
                eco.guardar(data);
                const diferencia = retorno - monto;
                return await sock.sendMessage(chatId, {
                    text: `💹 *INVERSIÓN EN ${String(def.asset || 'MERCADO').toUpperCase()}*\n\n@${num} invirtió *${eco.formatear(monto)}* coins.\n\n${etiqueta}\n📊 Neto: *${diferencia >= 0 ? '+' : '-'}${eco.formatear(Math.abs(diferencia))}* coins\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
                    mentions: [senderJid]
                });
            }

            if (def.tipo === 'apuesta') {
                const data = eco.cargar();
                const user = eco.usuario(data, chatId, num);
                const campoCooldown = `lastApuesta_${def.name}`;
                const restante = eco.cooldownRestante(user, campoCooldown);
                if (restante > 0) {
                    return await sock.sendMessage(chatId, { text: `⏳ Espera *${eco.espera(restante)}* para apostar de nuevo.` });
                }
                const apuesta = eco.parsearCantidad(args[0], user.coins);
                if (!apuesta) return await sock.sendMessage(chatId, { text: `⚠️ Uso: ,${def.name} <apuesta>` });
                if (user.coins < apuesta) {
                    return await sock.sendMessage(chatId, { text: `❌ Solo tienes *${eco.formatear(user.coins)}* coins.` });
                }

                eco.marcarCooldown(user, campoCooldown);
                const gano = eco.prob(def.chance || 50);
                const multiplicador = def.mult || 2;
                const pago = gano ? apuesta * multiplicador : 0;
                user.coins += gano ? pago : -apuesta;
                eco.guardar(data);

                return await sock.sendMessage(chatId, {
                    text: `${def.emoji || '🎲'} *${def.titulo || 'APUESTA'}*\n\n@${num} apostó *${eco.formatear(apuesta)}* coins a *${def.theme || def.name}*.\n\n${gano ? `🎉 ¡Ganaste *${eco.formatear(pago)}* coins! (x${multiplicador})` : `💸 Perdiste *${eco.formatear(apuesta)}* coins.`}\n\n💰 Balance: *${eco.formatear(user.coins)}*`,
                    mentions: [senderJid]
                });
            }

            const lista = Array.isArray(def.respuestas) ? def.respuestas : (pools[def.pool] || ['✨ Algo interesante está por pasar.']);
            const respuesta = reemplazar(eco.elegir(lista));

            if (def.tipo === 'accion') {
                return await sock.sendMessage(chatId, {
                    text: `${def.emoji || '💥'} ${respuesta}`,
                    mentions: [senderJid, targetJid]
                });
            }

            const titulo = `${def.pool === 'retosPicantes' ? '🔞 ' : ''}${def.titulo || '✨ DARHEART'}`;
            const extra = def.tipo === 'pregunta' && menciones.length
                ? `\n\n👉 @${numTarget}`
                : '';
            return await sock.sendMessage(chatId, {
                text: `${def.emoji || '✨'} *${titulo}*\n\n${respuesta}${extra}`,
                mentions: [senderJid, ...(menciones.length ? [targetJid] : [])]
            });
        }
    };
}

module.exports = { crear, ejecutarUtilidad };
