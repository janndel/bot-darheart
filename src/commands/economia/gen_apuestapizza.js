'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestapizza",
    "desc": "Apuesta coins a pizza (gana x2).",
    "tipo": "apuesta",
    "theme": "pizza",
    "titulo": "APUESTA: PIZZA",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
