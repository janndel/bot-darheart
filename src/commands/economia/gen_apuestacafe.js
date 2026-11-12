'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestacafe",
    "desc": "Apuesta coins a café (gana x3).",
    "tipo": "apuesta",
    "theme": "café",
    "titulo": "APUESTA: CAFÉ",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
