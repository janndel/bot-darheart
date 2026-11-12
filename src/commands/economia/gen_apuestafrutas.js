'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestafrutas",
    "desc": "Apuesta coins a frutas (gana x2).",
    "tipo": "apuesta",
    "theme": "frutas",
    "titulo": "APUESTA: FRUTAS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
