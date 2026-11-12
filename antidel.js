const fs = require('fs')
const path = require('path')
const v8 = require('v8')
const pino = require('pino')
const {
  downloadMediaMessage,
  getContentType,
  proto,
  WAMessageStubType,
} = require('@mrzkyzdnii/baileys')

const CACHE_MAX = 1500
const CACHE_TTL = 72 * 60 * 60 * 1000
const HANDLED_MAX = 3000
const REVOKE = proto.Message.ProtocolMessage.Type.REVOKE
const STUB_REVOKE = WAMessageStubType.REVOKE

const WRAPPERS = new Set([
  'viewOnceMessage',
  'viewOnceMessageV2',
  'viewOnceMessageV2Extension',
  'ephemeralMessage',
  'documentWithCaptionMessage',
  'editedMessage',
  'associatedChildMessage',
  'groupStatusMessage',
  'groupStatusMessageV2',
])

const MEDIA_TYPES = new Set([
  'imageMessage',
  'videoMessage',
  'audioMessage',
  'stickerMessage',
  'documentMessage',
])

const IGNORED_TYPES = new Set([
  'protocolMessage',
  'reactionMessage',
  'encReactionMessage',
  'pollUpdateMessage',
  'senderKeyDistributionMessage',
  'messageContextInfo',
])

const TYPE_LABEL = {
  imageMessage: 'foto',
  videoMessage: 'video',
  audioMessage: 'audio',
  stickerMessage: 'sticker',
  documentMessage: 'documento',
}

const MAX_IMAGE = 3 * 1024 * 1024
const MAX_VIDEO = 5 * 1024 * 1024
const MAX_AUDIO = 5 * 1024 * 1024
const DELIVERED_TTL = 10 * 60 * 1000
const DELIVERED_MAX = 500

function normJid(jid) {
  return jid ? String(jid).replace(/:\d+@/, '@') : ''
}

function toMs(value) {
  const n = value && typeof value.toNumber === 'function' ? value.toNumber() : Number(value)
  if (!Number.isFinite(n) || n <= 0) return Date.now()
  return n < 1e12 ? n * 1000 : n
}

function unwrapMessage(message) {
  let current = message
  let viewOnce = false
  for (let i = 0; i < 6 && current; i++) {
    const type = getContentType(current)
    if (!type || !WRAPPERS.has(type)) break
    if (type.startsWith('viewOnce')) viewOnce = true
    current = current[type]?.message
  }
  return { message: current, viewOnce }
}

function hasViewOnceWrapper(message) {
  let current = message
  for (let i = 0; i < 6 && current; i++) {
    const type = getContentType(current)
    if (!type) return false
    if (type.startsWith('viewOnce')) return true
    if (!WRAPPERS.has(type)) return false
    current = current[type]?.message
  }
  return false
}

function messageText(message, type) {
  if (!message || !type) return ''
  if (type === 'conversation') return message.conversation || ''
  const body = message[type]
  if (!body) return ''
  return (
    body.text ||
    body.caption ||
    body.contentText ||
    body.hydratedTemplate?.hydratedContentText ||
    body.description ||
    body.title ||
    body.singleSelectReply?.selectedRowId ||
    ''
  )
}

function buildEntry(msg) {
  if (!msg?.message || !msg?.key?.id || msg.key.fromMe) return null
  const chat = normJid(msg.key.remoteJid)
  if (!chat || chat === 'status@broadcast' || chat.endsWith('@newsletter') || chat.endsWith('@broadcast')) {
    return null
  }
  const unwrapped = unwrapMessage(msg.message)
  const type = getContentType(unwrapped.message)
  if (!type || IGNORED_TYPES.has(type)) return null
  const text = String(messageText(unwrapped.message, type) || '').trim()
  if (!MEDIA_TYPES.has(type) && !text) return null
  return {
    key: msg.key,
    message: unwrapped.message,
    type,
    text,
    ts: toMs(msg.messageTimestamp),
    pushName: msg.pushName || '',
    viewOnce: unwrapped.viewOnce || Boolean(unwrapped.message?.[type]?.viewOnce),
  }
}

function cacheId(key) {
  return `${normJid(key?.remoteJid)}:${key?.id || ''}`
}

function createStore(file, logger) {
  const items = new Map()
  const byId = new Map()
  let timer = null
  let dirty = false

  try {
    const saved = v8.deserialize(fs.readFileSync(file))
    for (const entry of Array.isArray(saved) ? saved : []) {
      if (!entry?.key?.id || !entry?.message) continue
      items.set(cacheId(entry.key), entry)
      byId.set(entry.key.id, entry)
    }
  } catch {}

  function prune() {
    const now = Date.now()
    for (const [id, entry] of items) {
      if (now - Number(entry.ts || 0) > CACHE_TTL) {
        items.delete(id)
        if (byId.get(entry.key.id) === entry) byId.delete(entry.key.id)
      }
    }
    while (items.size > CACHE_MAX) {
      const [id, entry] = items.entries().next().value
      items.delete(id)
      if (byId.get(entry.key.id) === entry) byId.delete(entry.key.id)
    }
  }

  function flush() {
    if (!dirty) return
    dirty = false
    const tmp = `${file}.tmp`
    try {
      fs.writeFileSync(tmp, v8.serialize([...items.values()]))
      fs.renameSync(tmp, file)
    } catch (e) {
      logger.error('anti-delete: no se pudo guardar la caché:', e?.message || e)
    }
  }

  function schedule() {
    if (timer) return
    timer = setTimeout(() => {
      timer = null
      flush()
    }, 1500)
    timer.unref?.()
  }

  function put(entry) {
    if (!entry) return
    const id = cacheId(entry.key)
    items.delete(id)
    items.set(id, entry)
    byId.set(entry.key.id, entry)
    prune()
    dirty = true
    schedule()
  }

  function get(key) {
    return items.get(cacheId(key)) || (key?.id ? byId.get(key.id) : null) || null
  }

  process.once('exit', flush)

  return { put, get, flush, values: () => items.values() }
}

function displayUser(jid, name) {
  const clean = String(name || '').trim()
  const user = normJid(jid).split('@')[0].split(':')[0]
  if (clean && user) return `${clean} (+${user})`
  if (clean) return clean
  if (user) return `+${user}`
  return 'desconocido'
}

function chatLabel(chat) {
  const clean = normJid(chat)
  if (clean.endsWith('@g.us')) return `Grupo ${clean.split('@')[0]}`
  if (clean.endsWith('@lid')) return `Chat LID ${clean.split('@')[0]}`
  return `Chat privado ${displayUser(clean)}`
}

function extFromMime(mime, fallback = 'bin') {
  const value = String(mime || '').toLowerCase().split(';')[0].trim()
  const map = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
    'video/quicktime': 'mov',
    'video/webm': 'webm',
    'video/3gpp': '3gp',
    'audio/ogg': 'ogg',
    'audio/opus': 'opus',
    'audio/mpeg': 'mp3',
    'audio/mp4': 'm4a',
    'audio/aac': 'aac',
    'audio/amr': 'amr',
    'audio/wav': 'wav',
    'application/pdf': 'pdf',
  }
  return map[value] || fallback
}

function createAntiDelete(sock, options = {}) {
  const logger = options.logger || console
  const getConfig = options.getConfig || (() => ({}))
  const getSelfJid =
    options.getSelfJid ||
    (() => normJid(sock.user?.id || sock.authState?.creds?.me?.id || sock.authState?.creds?.me?.lid))
  const cache = createStore(
    options.cachePath || path.join(__dirname, 'antidel-cache.bin'),
    logger
  )
  const handled = new Set()
  const delivered = new Map()
  const prefetching = new Map()
  const pendingViewOnce = new Map()

  function markHandled(id) {
    handled.add(id)
    if (handled.size > HANDLED_MAX) {
      for (const item of handled) {
        handled.delete(item)
        if (handled.size <= Math.floor(HANDLED_MAX / 2)) break
      }
    }
  }

  function fingerprint(entry) {
    const body = entry?.message?.[entry?.type]
    const sha = body?.fileSha256 || body?.fileEncSha256
    if (sha) return `sha:${Buffer.from(sha).toString('hex')}`
    return `msg:${normJid(entry?.key?.remoteJid)}:${entry?.key?.id || ''}`
  }

  function isDuplicate(entry) {
    const fp = fingerprint(entry)
    if (!fp) return false
    const now = Date.now()
    for (const [key, ts] of delivered) {
      if (now - ts > DELIVERED_TTL) delivered.delete(key)
    }
    if (delivered.has(fp)) return true
    delivered.set(fp, now)
    while (delivered.size > DELIVERED_MAX) {
      delivered.delete(delivered.keys().next().value)
    }
    return false
  }

  function noteViewOnce(msg) {
    const chat = normJid(msg?.key?.remoteJid)
    if (chat && hasViewOnceWrapper(msg?.message)) pendingViewOnce.set(chat, Date.now())
  }

  function viewOncePending(chat, aroundMs) {
    const key = normJid(chat)
    const at = pendingViewOnce.get(key)
    if (!at) return false
    if (Date.now() - at > 120000) {
      pendingViewOnce.delete(key)
      return false
    }
    return Math.abs((Number(aroundMs) || Date.now()) - at) <= 120000
  }

  function findRecentEntry(chat, aroundMs) {
    const target = normJid(chat)
    let best = null
    for (const entry of cache.values()) {
      if (!entry?.key?.id || !entry?.message) continue
      if (normJid(entry.key.remoteJid) !== target) continue
      if (entry.key.fromMe) continue
      if (!MEDIA_TYPES.has(entry.type)) continue
      const delta = Math.abs(Number(entry.ts || 0) - (Number(aroundMs) || Date.now()))
      if (delta > 120000) continue
      if (!best || delta < best.delta) best = { entry, delta }
    }
    return best?.entry || null
  }

  async function prefetchViewOnce(entry) {
    if (entry.type === 'videoMessage') return;
    const limit =
      entry.type === 'videoMessage'
        ? MAX_VIDEO
        : entry.type === 'audioMessage'
          ? MAX_AUDIO
          : MAX_IMAGE
    try {
      const buffer = await downloadEntry(entry)
      if (buffer?.length && buffer.length <= limit) {
        entry.buffer = buffer
        cache.put(entry)
        logger.log(
          `anti-delete: view-once ${TYPE_LABEL[entry.type] || 'archivo'} guardado (${buffer.length} bytes)`
        )
      }
    } catch (e) {
      logger.warn('anti-delete: no se pudo guardar el view-once:', e?.message || e)
    } finally {
      prefetching.delete(entry.key.id)
    }
  }

  function remember(msg) {
    try {
      const entry = buildEntry(msg)
      if (!entry) return
      let cfg = {}
      try {
        cfg = getConfig() || {}
      } catch {}
      if (cfg.antiDelete === false || cfg.antidel === false) return
      cache.put(entry)
      if (entry.viewOnce && MEDIA_TYPES.has(entry.type) && entry.type !== 'videoMessage') {
        const pending = prefetchViewOnce(entry)
        prefetching.set(entry.key.id, pending)
      }
    } catch (e) {
      logger.error('anti-delete: no se pudo guardar el mensaje:', e?.message || e)
    }
  }

  async function downloadEntry(entry) {
    let lastError = null
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const buffer = await downloadMediaMessage(
          { key: entry.key, message: entry.message },
          'buffer',
          {},
          {
            logger: pino({ level: 'silent' }),
            reuploadRequest: sock.updateMediaMessage,
          }
        )
        if (buffer?.length) return buffer
        lastError = new Error('archivo vacío')
      } catch (e) {
        lastError = e
        if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 800))
      }
    }
    throw lastError || new Error('no se pudo descargar el archivo')
  }

  async function sendContent(dest, content) {
    const media = Boolean(
      content.image || content.video || content.document || content.audio || content.sticker
    )
    const opts = media ? { mediaUploadTimeoutMs: 300000 } : undefined
    return sock.sendMessage(dest, content, opts)
  }

  async function deliver(entry, revokerKey, cfg) {
    const target = cfg.antiDeleteTarget === 'chat' ? 'chat' : 'self'
    const chat = normJid(entry.key.remoteJid)
    const dest = target === 'chat' ? chat : getSelfJid()
    if (!dest) {
      logger.error('anti-delete: no se pudo determinar el chat de destino')
      return
    }

    const sender = displayUser(
      entry.key.participant || (chat.endsWith('@g.us') ? null : chat),
      entry.pushName
    )
    const revoker = displayUser(
      revokerKey?.participant || revokerKey?.remoteJid,
      null
    )
    const header = [
      '🗑️ *MENSAJE ELIMINADO*',
      target === 'self' ? `💬 ${chatLabel(chat)}` : '',
      `👤 Enviado por: ${sender}`,
      `🗑️ Eliminado por: ${revoker}`,
      `🕒 ${new Date(entry.ts).toLocaleString('es-VE')}`,
      entry.viewOnce ? '🔒 Ver una sola vez' : '',
      '────────────────',
    ]
      .filter(Boolean)
      .join('\n')

    const body = (text) => (text ? `${header}\n${text}` : header)
    const label = TYPE_LABEL[entry.type] || 'mensaje'

    if (!MEDIA_TYPES.has(entry.type)) {
      await sendContent(dest, { text: body(entry.text) })
      logger.log(`anti-delete: texto recuperado en ${dest}`)
      return
    }

    let buffer = entry.buffer
    try {
      if (!buffer && prefetching.has(entry.key.id)) {
        buffer = await prefetching.get(entry.key.id)
      }
      if (!buffer) buffer = await downloadEntry(entry)
    } catch (e) {
      const fallback = `${header}\n\n⚠️ No se pudo recuperar el archivo (${label}).${
        entry.text ? `\n\n${entry.text}` : ''
      }`
      await sendContent(dest, { text: fallback })
      logger.error(`anti-delete: no se pudo recuperar ${label}:`, e?.message || e)
      return
    }

    const media = entry.message[entry.type] || {}
    const mimetype = media.mimetype || ''
    const fileName =
      media.fileName ||
      `mensaje_eliminado_${Date.now()}.${extFromMime(mimetype, 'bin')}`

    try {
      if (entry.type === 'imageMessage') {
        if (buffer.length <= MAX_IMAGE) {
          await sendContent(dest, { image: buffer, caption: body(entry.text), mimetype })
        } else {
          await sendContent(dest, { text: `${header}\n\n⚠️ Archivo eliminado omitido por superar el límite de peso.` })
        }
      } else if (entry.type === 'videoMessage') {
        if (buffer.length <= MAX_VIDEO) {
          await sendContent(dest, {
            video: buffer,
            caption: body(entry.text),
            mimetype: mimetype || 'video/mp4',
            gifPlayback: Boolean(media.gifPlayback),
          })
        } else {
          await sendContent(dest, { text: `${header}\n\n⚠️ Archivo eliminado omitido por superar el límite de peso.` })
        }
      } else if (entry.type === 'audioMessage') {
        if (buffer.length <= MAX_AUDIO) {
          await sendContent(dest, {
            audio: buffer,
            mimetype: mimetype || 'audio/ogg; codecs=opus',
            ptt: Boolean(media.ptt),
          })
          await sendContent(dest, { text: body(entry.text) })
        } else {
          await sendContent(dest, { text: `${header}\n\n⚠️ Archivo eliminado omitido por superar el límite de peso.` })
        }
      } else if (entry.type === 'stickerMessage') {
        await sendContent(dest, { sticker: buffer })
        await sendContent(dest, { text: body(entry.text) })
      } else {
        await sendContent(dest, {
          document: buffer,
          caption: body(entry.text),
          mimetype: mimetype || 'application/octet-stream',
          fileName,
        })
      }
      logger.log(`anti-delete: ${label} recuperado en ${dest}`)
    } catch (e) {
      logger.error(`anti-delete: no se pudo enviar ${label}:`, e?.message || e)
      try {
        await sendContent(dest, {
          text: `${header}\n\n⚠️ Se recuperó ${label}, pero no se pudo reenviar.${
            entry.text ? `\n\n${entry.text}` : ''
          }`,
        })
      } catch {}
    }
  }

  async function handleRevoke(targetKey, revokerKey, aroundMs) {
    if (!targetKey?.id || revokerKey?.fromMe) return
    const id = targetKey.id
    if (handled.has(id)) return
    let cfg = {}
    try {
      cfg = (await Promise.resolve(getConfig())) || {}
    } catch {}
    if (cfg.antiDelete === false || cfg.antidel === false) return
    const chat = normJid(targetKey.remoteJid)
    let entry = cache.get(targetKey)
    if (!entry && !targetKey.fromMe && chat && !chat.endsWith('@g.us') && viewOncePending(chat, aroundMs)) {
      entry = findRecentEntry(chat, aroundMs)
      if (entry) {
        logger.log(`anti-delete: usando copia cercana ${entry.key.id} para ${targetKey.id}`)
      }
    }
    if (!entry) {
      logger.warn(`anti-delete: no hay copia del mensaje eliminado ${targetKey.id}`)
      return
    }
    if (isDuplicate(entry)) {
      markHandled(id)
      logger.log(`anti-delete: duplicado ignorado ${targetKey.id}`)
      return
    }
    markHandled(id)
    try {
      await deliver(entry, revokerKey || {}, cfg)
    } catch (e) {
      logger.error('anti-delete: error recuperando mensaje:', e?.message || e)
    }
  }

  function onUpsert(event) {
    for (const msg of event?.messages || []) {
      noteViewOnce(msg)
      const protocol = msg?.message?.protocolMessage
      if (protocol && (protocol.type === REVOKE || protocol.type === 'REVOKE') && protocol.key?.id) {
        handleRevoke(protocol.key, msg.key, toMs(msg.messageTimestamp)).catch(() => {})
      } else {
        remember(msg)
      }
    }
  }

  function onUpdate(updates) {
    for (const update of updates || []) {
      if (update?.update?.messageStubType === STUB_REVOKE && update?.key?.id) {
        handleRevoke(
          update.key,
          update.update?.key || update.key,
          toMs(update.update?.messageTimestamp || update.messageTimestamp)
        ).catch(() => {})
      }
    }
  }

  function attach() {
    if (sock.__antiDeleteAttached) return api
    sock.__antiDeleteAttached = true
    sock.ev.on('messages.upsert', onUpsert)
    sock.ev.on('messages.update', onUpdate)
    return api
  }

  const api = {
    attach,
    remember,
    handleRevoke,
    flush: cache.flush,
    get: cache.get,
    onUpsert,
    onUpdate,
  }

  return attach()
}

module.exports = { createAntiDelete, buildEntry }
