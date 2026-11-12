'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "oraculoviaje",
    "desc": "Consulta de oraculo sobre viaje.",
    "tipo": "texto",
    "pool": "oraculo",
    "titulo": "ORÁCULO · VIAJE",
    "emoji": "🧿",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
