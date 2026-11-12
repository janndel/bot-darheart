'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaperla",
    "desc": "Apuesta coins a perla (gana x3).",
    "tipo": "apuesta",
    "theme": "perla",
    "titulo": "APUESTA: PERLA",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
