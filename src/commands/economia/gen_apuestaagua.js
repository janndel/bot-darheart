'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaagua",
    "desc": "Apuesta coins a agua (gana x3).",
    "tipo": "apuesta",
    "theme": "agua",
    "titulo": "APUESTA: AGUA",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
