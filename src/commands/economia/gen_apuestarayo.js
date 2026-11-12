'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestarayo",
    "desc": "Apuesta coins a rayo (gana x3).",
    "tipo": "apuesta",
    "theme": "rayo",
    "titulo": "APUESTA: RAYO",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
