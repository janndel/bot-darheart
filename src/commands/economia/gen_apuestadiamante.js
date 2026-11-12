'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestadiamante",
    "desc": "Apuesta coins a diamante (gana x2).",
    "tipo": "apuesta",
    "theme": "diamante",
    "titulo": "APUESTA: DIAMANTE",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
