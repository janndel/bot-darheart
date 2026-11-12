'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestasushi",
    "desc": "Apuesta coins a sushi (gana x3).",
    "tipo": "apuesta",
    "theme": "sushi",
    "titulo": "APUESTA: SUSHI",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
