'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestasombra",
    "desc": "Apuesta coins a sombra (gana x2).",
    "tipo": "apuesta",
    "theme": "sombra",
    "titulo": "APUESTA: SOMBRA",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
