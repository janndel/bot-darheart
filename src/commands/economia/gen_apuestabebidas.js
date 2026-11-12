'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestabebidas",
    "desc": "Apuesta coins a bebidas (gana x2).",
    "tipo": "apuesta",
    "theme": "bebidas",
    "titulo": "APUESTA: BEBIDAS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
