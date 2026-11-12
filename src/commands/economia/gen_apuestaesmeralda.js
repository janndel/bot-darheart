'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaesmeralda",
    "desc": "Apuesta coins a esmeralda (gana x2).",
    "tipo": "apuesta",
    "theme": "esmeralda",
    "titulo": "APUESTA: ESMERALDA",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
