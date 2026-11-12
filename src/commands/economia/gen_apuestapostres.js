'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestapostres",
    "desc": "Apuesta coins a postres (gana x3).",
    "tipo": "apuesta",
    "theme": "postres",
    "titulo": "APUESTA: POSTRES",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
