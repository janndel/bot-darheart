'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "oraculosalud",
    "desc": "Consulta de oraculo sobre salud.",
    "tipo": "texto",
    "pool": "oraculo",
    "titulo": "ORÁCULO · SALUD",
    "emoji": "🧿",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
