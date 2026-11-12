'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaboxeo",
    "desc": "Apuesta coins a boxeo (gana x2).",
    "tipo": "apuesta",
    "theme": "boxeo",
    "titulo": "APUESTA: BOXEO",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
