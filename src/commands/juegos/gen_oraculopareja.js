'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "oraculopareja",
    "desc": "Consulta de oraculo sobre pareja.",
    "tipo": "texto",
    "pool": "oraculo",
    "titulo": "ORÁCULO · PAREJA",
    "emoji": "🧿",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
