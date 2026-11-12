const OWNER_NUMBERS = new Set(
    (process.env.OWNER_NUMBERS || '75501934751805,584164659101,584162662671')
        .split(',')
        .map(n => n.replace(/\D/g, ''))
        .filter(Boolean)
);

function numero(jid) {
    return String(jid || '').split('@')[0].split(':')[0].replace(/\D/g, '');
}

function idsPropios(sock) {
    const me = { ...(sock?.authState?.creds?.me || {}), ...(sock?.user || {}) };
    return [...new Set([me.id, me.lid].map(numero).filter(Boolean))];
}

function esChatPropio(sock, chatId) {
    const id = numero(chatId);
    return Boolean(id) && idsPropios(sock).includes(id);
}

function esOwner(sock, msg) {
    if (msg?.key?.fromMe) return true;
    const remitente = numero(msg?.key?.participant || msg?.key?.remoteJid);
    return Boolean(remitente) && OWNER_NUMBERS.has(remitente);
}

function puedeEjecutar(command, sock, msg, chatId) {
    if (!command) return true;
    if (command.ownerOnly || command.category === 'owner') {
        return esOwner(sock, msg, chatId);
    }
    if (command.selfOnly) {
        return Boolean(msg?.key?.fromMe) && esChatPropio(sock, chatId);
    }
    return true;
}

function textoDenegado(command) {
    if (command?.selfOnly) return '🔒 Este comando solo funciona desde tu chat privado.';
    return '🚫 Solo el owner puede usar este comando.';
}

module.exports = {
    OWNER_NUMBERS,
    numero,
    idsPropios,
    esChatPropio,
    esOwner,
    puedeEjecutar,
    textoDenegado
};
