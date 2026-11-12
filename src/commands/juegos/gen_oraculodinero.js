'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "oraculodinero",
    "desc": "Consulta de oraculo sobre dinero.",
    "tipo": "texto",
    "pool": "oraculo",
    "titulo": "ORÁCULO · DINERO",
    "emoji": "🧿",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
