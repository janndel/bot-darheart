'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "oraculosecreto",
    "desc": "Consulta de oraculo sobre secreto.",
    "tipo": "texto",
    "pool": "oraculo",
    "titulo": "ORÁCULO · SECRETO",
    "emoji": "🧿",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
