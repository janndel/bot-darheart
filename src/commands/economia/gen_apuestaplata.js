'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaplata",
    "desc": "Apuesta coins a plata (gana x3).",
    "tipo": "apuesta",
    "theme": "plata",
    "titulo": "APUESTA: PLATA",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
