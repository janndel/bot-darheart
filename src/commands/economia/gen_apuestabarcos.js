'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestabarcos",
    "desc": "Apuesta coins a barcos (gana x3).",
    "tipo": "apuesta",
    "theme": "barcos",
    "titulo": "APUESTA: BARCOS",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
