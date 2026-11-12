'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaaire",
    "desc": "Apuesta coins a aire (gana x2).",
    "tipo": "apuesta",
    "theme": "aire",
    "titulo": "APUESTA: AIRE",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
