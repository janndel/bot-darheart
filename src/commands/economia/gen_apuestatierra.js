'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestatierra",
    "desc": "Apuesta coins a tierra (gana x2).",
    "tipo": "apuesta",
    "theme": "tierra",
    "titulo": "APUESTA: TIERRA",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
