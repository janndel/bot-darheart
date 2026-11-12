'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestatenis",
    "desc": "Apuesta coins a tenis (gana x3).",
    "tipo": "apuesta",
    "theme": "tenis",
    "titulo": "APUESTA: TENIS",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
