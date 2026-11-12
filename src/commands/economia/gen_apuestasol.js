'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestasol",
    "desc": "Apuesta coins a sol (gana x3).",
    "tipo": "apuesta",
    "theme": "sol",
    "titulo": "APUESTA: SOL",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
