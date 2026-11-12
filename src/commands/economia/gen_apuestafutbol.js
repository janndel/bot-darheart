'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestafutbol",
    "desc": "Apuesta coins a fútbol (gana x3).",
    "tipo": "apuesta",
    "theme": "fútbol",
    "titulo": "APUESTA: FÚTBOL",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
