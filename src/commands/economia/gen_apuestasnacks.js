'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestasnacks",
    "desc": "Apuesta coins a snacks (gana x2).",
    "tipo": "apuesta",
    "theme": "snacks",
    "titulo": "APUESTA: SNACKS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
