'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaplanetas",
    "desc": "Apuesta coins a planetas (gana x2).",
    "tipo": "apuesta",
    "theme": "planetas",
    "titulo": "APUESTA: PLANETAS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
