'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestarubi",
    "desc": "Apuesta coins a rubí (gana x3).",
    "tipo": "apuesta",
    "theme": "rubí",
    "titulo": "APUESTA: RUBÍ",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
