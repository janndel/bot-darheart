const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

function get(url, timeout = 15000, headers = {}) {
  return new Promise((resolve, reject) => {
    try {
      const lib = url.startsWith('https') ? https : http;
      const req = lib.get(url, { headers: { 'User-Agent': 'DarheartBot/1.0', 'Accept': 'application/json,image/*,video/*,*/*', ...headers } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          let loc = res.headers.location;
          if (loc.startsWith('/')) { const u = new URL(url); loc = u.origin + loc; }
          return resolve(get(loc, timeout, headers));
        }
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => resolve({ status: res.statusCode || 0, headers: res.headers || {}, buf: Buffer.concat(chunks) }));
      });
      req.on('error', reject);
      req.setTimeout(timeout, () => { try { req.destroy(new Error('timeout')); } catch {} });
    } catch (e) { reject(e); }
  });
}

async function getJson(url) {
  try {
    const r = await get(url, 12000);
    if (r.status < 200 || r.status >= 300) return null;
    return JSON.parse(r.buf.toString('utf8'));
  } catch { return null; }
}

async function downloadBuffer(url) {
  const r = await get(url, 30000);
  const ct = String(r.headers['content-type'] || '');
  if (r && r.status >= 200 && r.status < 300 && r.buf && r.buf.length > 500 && !/text\/html/i.test(ct)) {
    return { buf: r.buf, ct };
  }
  throw new Error('bad download ' + (r && r.status));
}

function run(cmd, args, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    const t = setTimeout(() => { try { p.kill('SIGKILL'); } catch {} }, timeoutMs);
    p.stderr.on('data', d => { err = (err + d.toString()).slice(-3000); });
    p.on('error', e => { clearTimeout(t); reject(e); });
    p.on('close', code => { clearTimeout(t); code === 0 ? resolve() : reject(new Error(err || ('exit ' + code))); });
  });
}

async function gifToMp4(buffer) {
  const tmp = path.join(os.tmpdir(), `rx_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const inF = tmp + '.gif';
  const outF = tmp + '.mp4';
  fs.writeFileSync(inF, buffer);
  try {
    await run('ffmpeg', [
      '-y', '-i', inF,
      '-movflags', 'faststart',
      '-pix_fmt', 'yuv420p',
      '-vf', 'scale=512:-2:flags=lanczos:force_original_aspect_ratio=decrease,fps=15,pad=ceil(iw/2)*2:ceil(ih/2)*2',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26',
      '-an', outF
    ], 120000);
    const out = fs.readFileSync(outF);
    if (!out || out.length < 1000) throw new Error('mp4 vacio');
    return out;
  } finally {
    try { fs.unlinkSync(inF); } catch {}
    try { fs.unlinkSync(outF); } catch {}
  }
}

function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function jidNum(j){ return String(j||'').split('@')[0].split(':')[0]; }

// --- Endpoints extraídos del bot de Telegram ---
// 1) Lolicon: https://api.lolicon.app/setu/v2?r18=0|1 (imágenes anime aleatorias, tag opcional)
// 2) Pollinations: https://image.pollinations.ai/prompt/{prompt}?width=1024&height=1024&nologo=true

async function getLoliconList(r18 = 0, num = 2, tags = []) {
  try {
    let url = `https://api.lolicon.app/setu/v2?r18=${r18 ? 1 : 0}&num=${num}`;
    if (tags && tags.length) url += `&tag=${encodeURIComponent(tags.join('|'))}`;
    const j = await getJson(url);
    return (j?.data || [])
      .map(d => d?.urls?.original || d?.urls?.regular || d?.urls?.small)
      .filter(Boolean);
  } catch {}
  return [];
}

async function getLolicon(r18 = 0, tags = []) {
  const list = await getLoliconList(r18, 1, tags);
  return list[0] || null;
}

function pollinations(prompt) {
  const enc = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${enc}?width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random()*1000000)}`;
}

const ACTION_PROMPTS = {
  hug: 'anime characters hugging warmly', kiss: 'anime kiss romantic', slap: 'anime slap funny',
  pat: 'anime head pat cute', cuddle: 'anime cuddle', dance: 'anime dancing', cry: 'anime crying',
  smile: 'anime smiling happy', wave: 'anime waving hello', bite: 'anime bite playful',
  blush: 'anime blushing shy', bonk: 'anime bonk head', poke: 'anime poke', kick: 'anime kick',
  kill: 'anime fight dramatic', highfive: 'anime high five', handhold: 'anime holding hands',
  wink: 'anime wink', smug: 'anime smug', think: 'anime thinking', run: 'anime running',
  angry: 'anime angry', happy: 'anime happy cheerful', laugh: 'anime laughing', nom: 'anime eating food',
  sleep: 'anime sleeping', lick: 'anime lick', waifu: 'beautiful anime girl', punch: 'anime punch',
  love: 'anime love hearts', sing: 'anime singing', bath: 'anime bath', cook: 'anime cooking'
};

const NSFW_PROMPTS = {
  cum: 'anime nsfw explicit', boobjob: 'anime nsfw boobs', anal: 'anime nsfw anal',
  blowjob: 'anime nsfw blowjob', fuck: 'anime nsfw sex', spank: 'anime nsfw spanking',
  kiss: 'anime nsfw kiss intimate', hug: 'anime nsfw embrace intimate', yuri: 'anime yuri girls',
  yaoi: 'anime yaoi boys', lickpussy: 'anime nsfw lick', lickdick: 'anime nsfw lick',
  handjob: 'anime nsfw hand', creampie: 'anime nsfw', deepthroat: 'anime nsfw',
  facesitting: 'anime nsfw', fingering: 'anime nsfw', footjob: 'anime nsfw feet',
  fap: 'anime nsfw masturbation', orgy: 'anime nsfw group', squirt: 'anime nsfw',
  undress: 'anime nsfw undress', bondage: 'anime nsfw bondage', default: 'anime nsfw hentai'
};

function buildPrompt(type, action) {
  const a = String(action || '').toLowerCase();
  if (type === 'nsfw') return NSFW_PROMPTS[a] || `${a} anime nsfw hentai`;
  return ACTION_PROMPTS[a] || `anime ${a} cute`;
}

// GIFs verificados de respaldo (si APIs fallan)
const SFW_BACKUP = [
  'https://media.tenor.com/1T1B8HcWalQAAAAC/anime-hug.gif',
  'https://media.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif',
  'https://media.tenor.com/kCZjTqCKiggAAAAC/hug.gif',
  'https://media.tenor.com/wUQH5CF2DJ4AAAAC/horimiya-hug-anime.gif',
  'https://media.tenor.com/G954PGQ7OX8AAAAC/anime-kiss.gif',
  'https://media.tenor.com/F02Ep3b2jJgAAAAC/cute-kawai.gif',
  'https://media.tenor.com/jnndDmOm5wMAAAAC/kiss.gif',
  'https://media.tenor.com/Ws6Dm1ZW_vMAAAAC/anime-slap.gif',
  'https://media.tenor.com/2-r7BEc-cb8AAAAC/slap-anime.gif',
  'https://media.tenor.com/PeJyQRCSHHkAAAAC/saki-saki-mukai-naoya.gif',
  'https://media.tenor.com/2vFAxyl6cI8AAAAC/head-pat-anime.gif',
  'https://media.tenor.com/wwxHnJqUNEMAAAAC/blush-anime.gif',
  'https://media.tenor.com/0qj0aqZ0nucAAAAC/anime-cry.gif',
  'https://media.tenor.com/4bV9ylEOWpgAAAAC/anime-cry.gif',
  'https://media.tenor.com/JS0ZB_b3kjoAAAAC/sugiura-ayano-funami-yui.gif',
  'https://media.tenor.com/CrmEU2LKix8AAAAC/bonk-anime.gif',
  'https://media.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif'
];

const RECENT = new Map();
function pickNonRecent(key, list) {
  const used = RECENT.get(key) || [];
  const fresh = list.filter(u => !used.includes(u));
  const pool = fresh.length ? fresh : list;
  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const next = [chosen, ...used.filter(u => u !== chosen)].slice(0, 6);
  RECENT.set(key, next);
  return chosen;
}

async function getMediaCandidates(type, action) {
  const a = String(action || 'waifu').toLowerCase();
  const urls = [];

  // 1) Lolicon (endpoint del bot de Telegram) - da imágenes variadas
  const lolis = await getLoliconList(type === 'nsfw' ? 1 : 0, 2);
  for (const u of lolis) if (!urls.includes(u)) urls.push(u);

  // 2) Pollinations (endpoint del bot de Telegram) - genera imagen por prompt/acción
  const prompt = buildPrompt(type, a);
  urls.push(pollinations(prompt));
  urls.push(pollinations(prompt + ' high quality'));

  // 3) nekos.best para SFW (rápido, gif/imagen variada) con UA correcto
  if (type !== 'nsfw') {
    try {
      const map = { hug:'hug', kiss:'kiss', slap:'slap', pat:'pat', cry:'cry', smile:'smile', wave:'wave', bite:'bite', blush:'blush', cuddle:'cuddle', dance:'dance', poke:'poke', wink:'wink', smug:'smug', think:'think', laugh:'laugh', nom:'nom', happy:'happy', kick:'kick', handhold:'handhold', highfive:'highfive', shoot:'shoot', stare:'stare', yeet:'yeet', nod:'nod', nope:'nope', thumbsup:'thumbsup' };
      const ep = map[a] || null;
      if (ep) {
        const j = await getJson(`https://nekos.best/api/v2/${ep}`);
        const u = j?.results?.[0]?.url;
        if (u) urls.push(u);
      }
    } catch {}
  }

  // 4) fallback gifs verificados
  for (const u of shuffle(SFW_BACKUP)) urls.push(u);

  // evitar repetir último por acción
  const key = `${type}:${a}`;
  const used = RECENT.get(key) || [];
  const ordered = urls.filter(u => !used.includes(u)).concat(urls.filter(u => used.includes(u)));
  const chosenFirst = ordered[0];
  if (chosenFirst) RECENT.set(key, [chosenFirst, ...used.filter(u => u !== chosenFirst)].slice(0, 8));
  return ordered;
}

async function sendReaction(sock, chatId, msg, opts) {
  const { type, action, selfText, targetText, emoji, caption, mentions: customMentions } = opts || {};
  const sender = msg.key.participant || msg.key.remoteJid;
  const mention = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  const target = mention || sender;
  const prefix = emoji || (type === 'nsfw' ? '😈' : '🌸');
  const act = action || 'acción';
  const text = caption || (mention
    ? `${prefix} @${jidNum(sender)} ${targetText || ('hizo *'+act+'* a')} @${jidNum(target)}`
    : `${prefix} @${jidNum(sender)} ${selfText || ('hizo *'+act+'*')}`);
  const mentions = (customMentions && customMentions.length) ? customMentions : [sender, mention].filter(Boolean);

  const urls = await getMediaCandidates(type, act);
  for (const url of urls) {
    try {
      const { buf, ct } = await downloadBuffer(url);
      const isImage = /image\/(png|jpe?g|webp)/i.test(ct) || /\.(png|jpe?g|webp)(\?|$)/i.test(url);
      const isGif = /image\/gif/i.test(ct) || /\.gif(\?|$)/i.test(url);
      const isMp4 = /video\/mp4/i.test(ct) || /\.mp4(\?|$)/i.test(url);

      if (isGif && !isMp4) {
        try {
          const mp4 = await gifToMp4(buf);
          await sock.sendMessage(chatId, { video: mp4, mimetype: 'video/mp4', gifPlayback: true, caption: text, mentions });
          return true;
        } catch (e) {
          try { await sock.sendMessage(chatId, { image: buf, caption: text, mentions }); return true; } catch {}
        }
      }
      if (isMp4) {
        try { await sock.sendMessage(chatId, { video: buf, mimetype: 'video/mp4', gifPlayback: true, caption: text, mentions }); return true; } catch (e) {}
      }
      if (isImage) {
        try { await sock.sendMessage(chatId, { image: buf, caption: text, mentions }); return true; } catch (e) {}
      }
      try { await sock.sendMessage(chatId, { image: buf, caption: text, mentions }); return true; } catch (e) {}
    } catch (e) {}
  }
  await sock.sendMessage(chatId, { text, mentions });
  return false;
}

module.exports = { getMediaCandidates, sendReaction, downloadBuffer, gifToMp4, getLolicon, getLoliconList, pollinations };
