'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestabaloncesto",
    "desc": "Apuesta coins a baloncesto (gana x2).",
    "tipo": "apuesta",
    "theme": "baloncesto",
    "titulo": "APUESTA: BALONCESTO",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
