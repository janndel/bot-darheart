const { spawn } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { descargarTikTok, enviarTikTok, formatearDuracion } = require('../../lib/tiktok');
const downloadQueue = require('../../lib/download-queue');
const { espacio, verificarEspacio, formatearBytes, guardarArchivoEnGaleria } = require('../../lib/storage');
const { parseHttpUrl, validarUrlDescarga, resolverHostSeguro, hostBloqueado } = require('../../lib/url');
const security = require('../../lib/security-log');
const downloadStore = require('../../lib/download-store');

const esTermux = fs.existsSync('/data/data/com.termux/files/usr');

function getYtdlp() {
    const local = path.join(process.cwd(), 'yt-dlp');
    if (fs.existsSync(local)) return './yt-dlp';
    return 'yt-dlp';
}

function buscarCookie(url) {
    try {
        const hostOriginal = new URL(url).hostname.toLowerCase();
        const host = hostOriginal.replace(/^www\./, '');
        const partes = host.split('.');
        const base = partes.length > 1 ? partes[partes.length - 2] : host;
        const carpetas = [
            path.join(process.env.HOME, 'storage', 'downloads'),
            path.join(process.env.HOME, 'ck')
        ];
        for (const dir of carpetas) {
            if (!fs.existsSync(dir)) continue;
            const archivos = fs.readdirSync(dir).filter(f => f.endsWith('.txt'));
            const exacto = archivos.find(f => {
                const nombre = f.toLowerCase();
                return nombre === `${hostOriginal}_cookies.txt` || nombre === `${hostOriginal}.txt`
                    || nombre === `${host}_cookies.txt` || nombre === `${host}.txt`;
            });
            if (exacto) return path.join(dir, exacto);
            const match = archivos.find(f => {
                const nombre = f.toLowerCase();
                return nombre.includes(hostOriginal) || nombre.includes(host)
                    || (base.length > 2 && nombre.includes(base));
            });
            if (match) return path.join(dir, match);
        }
    } catch (e) {}
    return null;
}

function leerCookiesComoString(cookieFile) {
    try {
        return fs.readFileSync(cookieFile, 'utf8')
            .split('\n')
            .filter(l => l && !l.startsWith('#'))
            .map(l => { const p = l.split('\t'); return p.length >= 7 ? `${p[5]}=${p[6]}` : ''; })
            .filter(Boolean).join('; ');
    } catch { return ''; }
}

function ejecutarYtdlp(args, { timeoutMs = 30 * 60 * 1000, job = null, onProgress = null } = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(getYtdlp(), args, {
            detached: true,
            stdio: ['ignore', 'pipe', 'pipe']
        });
        if (job) downloadQueue.registrarProceso(job, child, { grupo: true });

        let stdout = '';
        let stderr = '';
        let ultimoPct = -1;
        let ultimoEnvio = 0;
        let terminado = false;

        const leer = (trozo, esError) => {
            const texto = trozo.toString();
            if (esError) stderr = (stderr + texto).slice(-64 * 1024);
            else stdout = (stdout + texto).slice(-64 * 1024);
            const m = texto.match(/(\d{1,3}(?:\.\d+)?)%/);
            if (m) {
                const pct = Math.max(0, Math.min(100, Math.floor(Number(m[1]))));
                const ahora = Date.now();
                if (pct !== ultimoPct && (pct >= ultimoPct + 10 || ahora - ultimoEnvio > 8000 || pct === 100)) {
                    ultimoPct = pct;
                    ultimoEnvio = ahora;
                    if (job) job.reportar(pct, 'descargando');
                    if (onProgress) onProgress(pct, texto).catch(() => {});
                }
            }
        };

        child.stdout?.on('data', t => leer(t, false));
        child.stderr?.on('data', t => leer(t, true));

        const timer = setTimeout(() => {
            if (terminado) return;
            try { child.kill('SIGTERM'); } catch {}
            try { if (child.pid) process.kill(-child.pid, 'SIGTERM'); } catch {}
            setTimeout(() => {
                try { child.kill('SIGKILL'); } catch {}
                try { if (child.pid) process.kill(-child.pid, 'SIGKILL'); } catch {}
            }, 4000).unref?.();
        }, timeoutMs);
        timer.unref?.();

        const abort = () => {
            if (terminado) return;
            try { child.kill('SIGTERM'); } catch {}
            try { if (child.pid) process.kill(-child.pid, 'SIGTERM'); } catch {}
        };
        if (job?.abortController?.signal) {
            if (job.abortController.signal.aborted) abort();
            else job.abortController.signal.addEventListener('abort', abort, { once: true });
        }

        child.on('error', err => {
            if (terminado) return;
            terminado = true;
            clearTimeout(timer);
            reject(new Error(err.message));
        });

        child.on('close', code => {
            if (terminado) return;
            terminado = true;
            clearTimeout(timer);
            if (job?.abortController?.signal?.aborted) return reject(new Error('Descarga cancelada.'));
            if (code === 0) return resolve(stdout);
            reject(new Error((stderr || stdout || `yt-dlp terminó con código ${code}`).trim().slice(-400)));
        });
    });
}

function ejecutarFfmpeg(args, timeoutMs = 90000) {
    return new Promise((resolve, reject) => {
        const child = spawn('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
        let stderr = '';
        const timer = setTimeout(() => {
            try { child.kill('SIGKILL'); } catch {}
        }, timeoutMs);
        timer.unref?.();
        child.stderr?.on('data', t => { stderr = (stderr + t.toString()).slice(-4000); });
        child.on('error', err => { clearTimeout(timer); reject(err); });
        child.on('close', code => {
            clearTimeout(timer);
            if (code === 0) resolve();
            else reject(new Error(stderr.slice(-300) || `ffmpeg terminó con código ${code}`));
        });
    });
}

// ✅ Convertir GIF a MP4 para que WhatsApp lo reproduzca bien
async function gifAMp4(buffer) {
    const tmpGif = path.join(os.tmpdir(), `gif_${Date.now()}.gif`);
    const tmpMp4 = path.join(os.tmpdir(), `gif_${Date.now()}.mp4`);
    try {
        fs.writeFileSync(tmpGif, buffer);
        // ✅ Loop infinito, sin audio, tamaño 512px de ancho máximo
        await ejecutarFfmpeg([
            '-i', tmpGif,
            '-movflags', 'faststart',
            '-pix_fmt', 'yuv420p',
            '-vf', 'scale=512:-1:flags=lanczos,fps=15',
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-crf', '23',
            '-an',
            '-loop', '0',
            tmpMp4,
            '-y'
        ], 90000);
        const mp4Buffer = fs.readFileSync(tmpMp4);
        try { fs.unlinkSync(tmpGif); } catch(e){}
        try { fs.unlinkSync(tmpMp4); } catch(e){}
        return mp4Buffer;
    } catch (e) {
        try { if (fs.existsSync(tmpGif)) fs.unlinkSync(tmpGif); } catch(x){}
        try { if (fs.existsSync(tmpMp4)) fs.unlinkSync(tmpMp4); } catch(x){}
        throw e;
    }
}

function detectarTipo(archivo, contentType = '') {
    const ext = path.extname(archivo).toLowerCase();
    const imgExts = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];
    const gifExts = ['.gif'];
    const vidExts = ['.mp4', '.mkv', '.webm', '.mov', '.avi', '.m4v'];
    
    if (gifExts.includes(ext)) return 'gif';
    if (imgExts.includes(ext)) return 'image';
    if (vidExts.includes(ext)) return 'video';
    
    if (contentType.includes('gif')) return 'gif';
    if (contentType.startsWith('image/')) return 'image';
    if (contentType.startsWith('video/')) return 'video';
    
    return 'unknown';
}

function esUrlDirecta(url) {
    return /\.(jpg|jpeg|png|gif|webp|bmp|mp4|webm|mov|m4v)(\?|$)/i.test(url.toLowerCase());
}

function shortcodeAPk(shortcode) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let pk = 0n;
    for (const c of shortcode) {
        const idx = chars.indexOf(c);
        if (idx < 0) return null;
        pk = pk * 64n + BigInt(idx);
    }
    return pk.toString();
}

function mejorCandidato(candidatos) {
    return (candidatos || [])
        .filter(c => c && c.url)
        .sort((a, b) => ((b.width || 0) * (b.height || 0)) - ((a.width || 0) * (a.height || 0)))[0];
}

function extraerMediosInstagram(item) {
    const medios = [];
    const carrusel = Array.isArray(item.carousel_media) ? item.carousel_media : [item];

    for (const media of carrusel) {
        const videos = (media.video_versions || []).filter(v => v && v.url);
        if (videos.length) {
            videos.sort((a, b) => ((b.width || 0) * (b.height || 0)) - ((a.width || 0) * (a.height || 0)));
            medios.push({ tipo: 'video', url: videos[0].url });
            continue;
        }
        const imagen = mejorCandidato(media.image_versions2?.candidates);
        if (imagen) medios.push({ tipo: 'image', url: imagen.url });
    }

    return medios;
}

async function descargarInstagram(sock, chatId, url, cookie) {
    const match = url.match(/instagram\.com\/(?:p|reel|reels|tv)\/([^/?#]+)/i);
    if (!match) return 0;

    const pk = shortcodeAPk(match[1]);
    if (!pk) return 0;

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'X-IG-App-ID': '936619743392459',
        'X-ASBD-ID': '359341',
        'X-IG-WWW-Claim': '0',
        'Accept': '*/*',
        'Referer': 'https://www.instagram.com/'
    };
    if (cookie) {
        const ck = leerCookiesComoString(cookie);
        if (ck) headers.Cookie = ck;
    }

    const apiRes = await axios.get(`https://www.instagram.com/api/v1/media/${pk}/info/`, {
        timeout: 20000,
        headers
    });

    const item = apiRes.data?.items?.[0];
    if (!item) throw new Error('Instagram sin datos');

    const medios = extraerMediosInstagram(item).slice(0, 20);
    if (!medios.length) throw new Error('Instagram sin medios');

    let enviados = 0;
    for (let i = 0; i < medios.length; i++) {
        const media = medios[i];
        const res = await axios.get(media.url, {
            responseType: 'arraybuffer',
            timeout: 40000,
            maxContentLength: 100 * 1024 * 1024,
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://www.instagram.com/'
            }
        });
        const buffer = Buffer.from(res.data);
        const ct = res.headers['content-type'] || '';
        const detectado = detectarTipo(media.url, ct);
        const tipo = media.tipo === 'video' ? 'video' : (detectado === 'unknown' ? 'image' : detectado);
        const nombre = `ig_${Date.now()}_${i + 1}.${tipo === 'video' ? 'mp4' : 'jpg'}`;
        const ok = await enviarArchivo(sock, chatId, buffer, tipo, 'Instagram', nombre, i + 1, medios.length);
        if (ok) enviados++;
        if (i < medios.length - 1) await new Promise(r => setTimeout(r, 1200));
    }

    return enviados;
}

// ✅ Enviar según el tipo detectado
async function enviarArchivo(sock, chatId, buffer, tipo, dominio, nombreArchivo, indice = 1, total = 1) {
    const tamañoMB = (buffer.length / 1024 / 1024).toFixed(2);
    const etiqueta = total > 1 ? ` ${indice}/${total}` : '';

    if (tipo === 'gif') {
        // ✅ Convertir GIF a MP4 y enviar como video
        try {
            console.log('🎞️ Convirtiendo GIF a MP4...');
            const mp4Buffer = await gifAMp4(buffer);
            const tamañoMp4 = (mp4Buffer.length / 1024 / 1024).toFixed(2);
            console.log(`✅ GIF convertido (${tamañoMp4} MB)`);

            await sock.sendMessage(chatId, {
                video: mp4Buffer,
                mimetype: 'video/mp4',
                gifPlayback: true,
                caption: `🎞️ *GIF${etiqueta} de ${dominio}*`
            });
            console.log('✅ GIF (MP4) enviado');
            return true;
        } catch (e) {
            console.log('⚠️ Conversión GIF falló:', e.message);
            // Fallback: enviar como imagen (se verá estático)
            try {
                await sock.sendMessage(chatId, {
                    image: buffer,
                    caption: `🖼️ *GIF${etiqueta} de ${dominio}* (estático)`
                });
                return true;
            } catch (e2) { return false; }
        }
    }

    if (tipo === 'image') {
        try {
            await sock.sendMessage(chatId, {
                image: buffer,
                caption: `🖼️ *Imagen${etiqueta} de ${dominio}*`
            });
            console.log('✅ Imagen enviada');
            return true;
        } catch (e) { return false; }
    }

    if (tipo === 'video') {
        try {
            await sock.sendMessage(chatId, {
                video: buffer,
                mimetype: 'video/mp4',
                caption: `✅ *${dominio}*${etiqueta}\n📹 ${tamañoMB} MB`
            });
            console.log('✅ Video enviado');
            return true;
        } catch (e) {
            console.log('⚠️ Envío de video falló:', e.message);
            try {
                const moviesDir = path.join(os.homedir(), 'storage', 'movies');
                fs.mkdirSync(moviesDir, { recursive: true });
                const fileName = nombreArchivo || `dl_${Date.now()}.mp4`;
                fs.writeFileSync(path.join(moviesDir, fileName), buffer);
                await sock.sendMessage(chatId, {
                    text: `✅ *Video${etiqueta} guardado en tu galería*\n📁 ${fileName}\n📹 ${tamañoMB} MB`
                });
                return true;
            } catch (e2) {
                return false;
            }
        }
    }

    return false;
}

async function enviarLista(sock, chatId, tmpDir, archivos, dominio) {
    let enviados = 0;
    const total = archivos.length;

    for (let i = 0; i < total; i++) {
        const nombre = archivos[i];
        const ruta = path.join(tmpDir, nombre);
        try {
            const tipo = detectarTipo(nombre);
            if (tipo === 'unknown') continue;
            const size = fs.statSync(ruta).size;
            if (tipo === 'video' && size > 64 * 1024 * 1024) {
                const guardado = await guardarArchivoEnGaleria(ruta, nombre, 'movies');
                await sock.sendMessage(chatId, {
                    text: `✅ *Video guardado en tu galería*\n📁 ${path.basename(guardado)}\n📹 ${(size / 1024 / 1024).toFixed(2)} MB`
                });
                enviados++;
                continue;
            }
            const buffer = fs.readFileSync(ruta);
            const ok = await enviarArchivo(sock, chatId, buffer, tipo, dominio, nombre, i + 1, total);
            if (ok) enviados++;
        } catch (e) {
            console.log(`⚠️ Error con ${nombre}:`, e.message);
        } finally {
            try { if (fs.existsSync(ruta)) fs.unlinkSync(ruta); } catch (e) {}
        }
        if (i < total - 1) await new Promise(r => setTimeout(r, 1200));
    }

    return enviados;
}

async function descargar(sock, msg, args, { chatId }, job) {
        const url = args[0];
        const parsed = parseHttpUrl(url);
        if (!parsed) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ *Uso:* ,dl <link>\n\n_Descarga imágenes, GIFs y videos automáticamente._'
            });
        }

        const dominio = parsed.hostname;
        const libre = espacio().libre;
        if (libre && libre < 350 * 1024 * 1024) {
            return await sock.sendMessage(chatId, {
                text: `❌ Poco espacio libre (${formatearBytes(libre)}). Libera al menos 350 MB antes de descargar.`
            });
        }

        const cancelado = () => Boolean(job?.abortController?.signal?.aborted);
        let ultimoAviso = 0;
        const avisarProgreso = async (pct) => {
            if (pct < 25 || pct - ultimoAviso < 25 || pct >= 100) return;
            ultimoAviso = pct;
            await sock.sendMessage(chatId, { text: `📥 *${dominio}*: ${pct}%` }).catch(() => {});
        };

        await sock.sendMessage(chatId, { text: `⏳ Descargando de *${dominio}*...` });

        const cookie = buscarCookie(url);
        if (cookie) console.log(`🍪 Cookie: ${path.basename(cookie)}`);

        // ==========================================
        // ✅ CASO 1: URL directa
        // ==========================================
        if (esUrlDirecta(url)) {
            console.log('📥 URL directa detectada');
            if (cancelado()) throw new Error('Descarga cancelada.');
            try {
                const headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                };
                if (cookie) {
                    const ck = leerCookiesComoString(cookie);
                    if (ck) headers['Cookie'] = ck;
                }

                const res = await axios.get(url, {
                    responseType: 'arraybuffer',
                    timeout: 40000,
                    maxContentLength: 100 * 1024 * 1024,
                    headers,
                    signal: job?.abortController?.signal,
                    beforeRedirect: (opciones) => {
                        if (hostBloqueado(opciones.hostname)) throw new Error('Redirección bloqueada por seguridad.');
                    }
                });

                const buffer = Buffer.from(res.data);
                const contentType = res.headers['content-type'] || '';
                const tipo = detectarTipo(url, contentType);
                console.log(`📦 Content-Type: ${contentType}, tipo: ${tipo}`);

                if (tipo !== 'unknown') {
                    const ok = await enviarArchivo(sock, chatId, buffer, tipo, dominio);
                    if (ok) return;
                }
            } catch (e) {
                if (cancelado()) throw new Error('Descarga cancelada.');
                console.log('⚠️ URL directa falló:', e.message);
            }
        }

        // ==========================================
        // ✅ CASO 2.5: Twitter/X (FxTwitter, todos los medios)
        // ==========================================
        if (dominio.includes('twitter.com') || dominio.includes('x.com')) {
            console.log('🐦 Twitter/X detectado...');
            try {
                const tweetIdMatch = url.match(/status\/(\d+)/);
                if (tweetIdMatch) {
                    const apiRes = await axios.get(`https://api.fxtwitter.com/status/${tweetIdMatch[1]}`, {
                        timeout: 20000,
                        headers: { 'User-Agent': 'Mozilla/5.0' }
                    });

                    const media = apiRes.data?.tweet?.media;
                    if (media) {
                        const items = [];
                        if (Array.isArray(media.all) && media.all.length) {
                            items.push(...media.all);
                        } else {
                            for (const foto of media.photos || []) items.push({ type: 'photo', url: foto.url });
                            for (const video of media.videos || []) items.push({ type: 'video', url: video.url, variants: video.variants });
                        }

                        const unicos = [];
                        const vistos = new Set();
                        for (const item of items) {
                            const tipo = item.type === 'photo' || item.type === 'image' ? 'image' : 'video';
                            let mediaUrl = item.url;
                            if (tipo === 'video') {
                                const variantes = (item.variants || [])
                                    .filter(v => v && v.url && (v.content_type === 'video/mp4' || /\.mp4(\?|$)/i.test(v.url)))
                                    .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
                                mediaUrl = variantes[0]?.url || item.url;
                            }
                            if (!mediaUrl || vistos.has(mediaUrl)) continue;
                            vistos.add(mediaUrl);
                            unicos.push({ tipo, url: mediaUrl });
                        }

                        if (unicos.length) {
                            let enviados = 0;
                            for (let i = 0; i < unicos.length; i++) {
                                try {
                                    const res = await axios.get(unicos[i].url, {
                                        responseType: 'arraybuffer',
                                        timeout: 40000,
                                        maxContentLength: 100 * 1024 * 1024,
                                        headers: { 'User-Agent': 'Mozilla/5.0' },
                                        signal: job?.abortController?.signal
                                    });
                                    const buffer = Buffer.from(res.data);
                                    const ct = res.headers['content-type'] || '';
                                    const detectado = detectarTipo(unicos[i].url, ct);
                                    const tipoFinal = detectado === 'unknown' ? unicos[i].tipo : detectado;
                                    const ok = await enviarArchivo(sock, chatId, buffer, tipoFinal, 'Twitter/X', `x_${i + 1}`, i + 1, unicos.length);
                                    if (ok) enviados++;
                                } catch (e) {
                                    if (cancelado()) throw new Error('Descarga cancelada.');
                                    console.log(`⚠️ FxTwitter item ${i + 1} falló:`, e.message);
                                }
                                if (i < unicos.length - 1) await new Promise(r => setTimeout(r, 1200));
                            }
                            if (enviados > 0) return;
                        }
                    }
                }
            } catch (e) {
                if (cancelado()) throw new Error('Descarga cancelada.');
                console.log('⚠️ FxTwitter falló:', e.message);
            }
        }

        // ==========================================
        // ✅ CASO 2.6: Instagram (todos los medios)
        // ==========================================
        if (dominio.includes('instagram.com')) {
            console.log('📸 Instagram detectado...');
            try {
                const enviados = await descargarInstagram(sock, chatId, url, cookie);
                if (enviados > 0) return;
            } catch (e) {
                if (cancelado()) throw new Error('Descarga cancelada.');
                console.log('⚠️ Instagram API falló:', e.message);
            }
        }

        // ==========================================
        // ✅ CASO 2.7: TikTok (video o fotos)
        // ==========================================
        if (dominio.includes('tiktok.com')) {
            console.log('🎵 TikTok detectado...');
            try {
                const data = await descargarTikTok(url, {
                    timeoutMs: 1800000,
                    job,
                    onInfo: async (info) => {
                        verificarEspacio(Number(info.size) || 0, 350 * 1024 * 1024);
                        if (info.tipo !== 'video' || (info.size <= 64 * 1024 * 1024 && info.duration <= 120)) return;
                        const partes = [];
                        if (info.size) partes.push(`~${(info.size / 1024 / 1024).toFixed(1)} MB`);
                        if (info.duration) partes.push(formatearDuracion(info.duration));
                        await sock.sendMessage(chatId, {
                            text: `📥 Video grande${partes.length ? ` (${partes.join(', ')})` : ''}. Se guardará en tu galería al terminar.`
                        });
                    }
                });
                const enviados = await enviarTikTok(sock, chatId, data);
                if (enviados > 0) return;
            } catch (e) {
                if (cancelado()) throw new Error('Descarga cancelada.');
                if (e?.code === 'ESPACIO') {
                    return await sock.sendMessage(chatId, { text: `❌ ${e.message}` });
                }
                console.log('⚠️ TikTok falló:', e.message);
            }
        }

        // ==========================================
        // ✅ CASO 3: yt-dlp
        // ==========================================
        const esYouTube = /(^|\.)youtube\.com$|(^|\.)youtu\.be$/i.test(dominio);
        const libreAhora = espacio().libre;
        const maxBytes = libreAhora ? Math.max(50 * 1024 * 1024, libreAhora - 350 * 1024 * 1024) : 500 * 1024 * 1024;
        const flagsBase = [
            '--no-update',
            '--no-warnings',
            '--max-filesize', `${Math.floor(maxBytes / 1024 / 1024)}M`,
            '--socket-timeout', '30',
            '--retries', '3',
            '--no-check-certificates',
            '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        ];

        if (esYouTube) flagsBase.push('--no-playlist');
        else flagsBase.push('--playlist-end', '20');

        const intentos = esYouTube ? [
            'best[ext=mp4]/best',
            'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]',
            'best[ext=gif]/best',
            'best'
        ] : [
            'best',
            'bestvideo*+bestaudio/best',
            'best[ext=mp4]/best',
            'best[ext=gif]/best'
        ];

        for (const fmt of intentos) {
            if (cancelado()) throw new Error('Descarga cancelada.');
            const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dl_'));
            const outTemplate = path.join(tmpDir, 'media_%(autonumber)02d.%(ext)s');
            const args = [...flagsBase, '-f', fmt, '--merge-output-format', 'mp4', '-o', outTemplate];
            if (cookie) args.unshift('--cookies', cookie);
            args.push(url);

            try {
                console.log(`🎬 Formato ${fmt}`);
                await ejecutarYtdlp(args, { job, onProgress: avisarProgreso });

                const archivos = fs.readdirSync(tmpDir)
                    .filter(f => !f.endsWith('.part') && !f.endsWith('.ytdl'))
                    .sort();
                const validos = archivos.filter(f => detectarTipo(f) !== 'unknown');
                if (validos.length === 0) throw new Error('Sin archivo');

                console.log(`✅ ${validos.length} archivo(s) descargado(s)`);
                const enviados = await enviarLista(sock, chatId, tmpDir, validos, dominio);
                if (enviados > 0) {
                    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
                    return;
                }
                throw new Error('No se pudo enviar ningún archivo');
            } catch (e) {
                try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (x) {}
                if (cancelado()) throw new Error('Descarga cancelada.');
                console.log(`❌ ${e.message.slice(0, 80)}`);
            }
        }

        // ==========================================
        // ✅ CASO 4: Fallback axios
        // ==========================================
        try {
            console.log('🔄 Fallback axios...');
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            };
            if (cookie) {
                const ck = leerCookiesComoString(cookie);
                if (ck) headers['Cookie'] = ck;
            }

            const res = await axios.get(url, {
                responseType: 'arraybuffer',
                timeout: 30000,
                headers,
                maxContentLength: 50 * 1024 * 1024,
                signal: job?.abortController?.signal,
                beforeRedirect: (opciones) => {
                    if (hostBloqueado(opciones.hostname)) throw new Error('Redirección bloqueada por seguridad.');
                }
            });

            const buffer = Buffer.from(res.data);
            const ct = res.headers['content-type'] || '';
            const tipo = detectarTipo(url, ct);

            if (tipo !== 'unknown') {
                const ok = await enviarArchivo(sock, chatId, buffer, tipo, dominio);
                if (ok) return;
            }
        } catch (e) {
            if (cancelado()) throw new Error('Descarga cancelada.');
            console.log('⚠️ Fallback falló:', e.message);
        }

        if (!cancelado()) {
            await sock.sendMessage(chatId, {
                text: `❌ No se pudo descargar de *${dominio}*`
            });
        }
}

async function encolarUrl(sock, chatId, url, { msg = null } = {}) {
    const validacion = validarUrlDescarga(url);
    if (!validacion.ok) {
        security.registrar('url_bloqueada', {
            usuario: msg?.key?.participant || msg?.key?.remoteJid,
            chat: chatId,
            comando: 'dl',
            detalle: `${url || ''} | ${validacion.error}`
        });
        await sock.sendMessage(chatId, {
            text: `⚠️ ${validacion.error}\n\nUso: ,dl <link>`
        }).catch(() => {});
        return null;
    }

    const resolucion = await resolverHostSeguro(url);
    if (!resolucion.ok) {
        security.registrar('url_no_segura', {
            usuario: msg?.key?.participant || msg?.key?.remoteJid,
            chat: chatId,
            comando: 'dl',
            detalle: `${url} | ${resolucion.error}`
        });
        await sock.sendMessage(chatId, { text: `🚫 ${resolucion.error}` }).catch(() => {});
        return null;
    }

    const job = downloadQueue.enqueue(
        { chatId, tipo: 'dl', url },
        ({ job, reportar }) => {
            job.reportar = reportar;
            return descargar(sock, msg || { key: {} }, [url], { chatId }, job);
        }
    );
    downloadStore.agregarPendiente(url, chatId, 'dl');

    const posicion = downloadQueue.posicion(job);
    if (posicion > 1) {
        await sock.sendMessage(chatId, {
            text: `⏳ En cola (#${posicion - 1}). Te aviso cuando empiece.`
        }).catch(() => {});
    }

    try {
        const resultado = await job.promise;
        downloadStore.quitarPendiente(url, chatId);
        return resultado;
    } catch (error) {
        downloadStore.quitarPendiente(url, chatId);
        const cancelado = job.estado === 'cancelled' || /cancelad/i.test(String(error?.message));
        if (!cancelado) downloadStore.agregarFallida(url, chatId, error?.message);
        if (cancelado) {
            await sock.sendMessage(chatId, { text: '❌ Descarga cancelada.' }).catch(() => {});
        } else if (!/No se pudo descargar/i.test(String(error?.message))) {
            await sock.sendMessage(chatId, {
                text: `❌ No se pudo descargar.\n_${String(error?.message).slice(0, 300)}_`
            }).catch(() => {});
        }
        return null;
    }
}

async function reanudar(sock) {
    const pendientes = downloadStore.pendientesRecientes();
    let intentos = 0;
    for (const item of pendientes) {
        if (!item?.url || !item?.chatId) continue;
        downloadStore.quitarPendiente(item.url, item.chatId);
        intentos++;
        try {
            await encolarUrl(sock, item.chatId, item.url);
        } catch (e) {
            console.log('⚠️ No se pudo reanudar:', e.message);
        }
    }
    return intentos;
}

async function reintentar(sock, chatId) {
    const fallida = downloadStore.ultimaFallida(chatId);
    if (!fallida) return null;
    downloadStore.quitarFallida(fallida.url, chatId);
    return await encolarUrl(sock, chatId, fallida.url);
}

module.exports = {
    name: 'dl',
    alias: ['descargar', 'download', 'bajar'],
    category: 'descargas',
    desc: 'Descarga imágenes, GIFs y videos de cualquier sitio',
    timeout: 1800000,
    async execute(sock, msg, args, ctx) {
        return await encolarUrl(sock, ctx.chatId, args[0], { msg });
    },
    encolarUrl,
    reanudar,
    reintentar
};

