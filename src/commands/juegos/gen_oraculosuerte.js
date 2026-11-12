'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "oraculosuerte",
    "desc": "Consulta de oraculo sobre suerte.",
    "tipo": "texto",
    "pool": "oraculo",
    "titulo": "ORÁCULO · SUERTE",
    "emoji": "🧿",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
