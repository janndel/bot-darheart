'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaaguila",
    "desc": "Apuesta coins a águila (gana x3).",
    "tipo": "apuesta",
    "theme": "águila",
    "titulo": "APUESTA: ÁGUILA",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
