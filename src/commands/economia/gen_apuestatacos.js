'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestatacos",
    "desc": "Apuesta coins a tacos (gana x2).",
    "tipo": "apuesta",
    "theme": "tacos",
    "titulo": "APUESTA: TACOS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
