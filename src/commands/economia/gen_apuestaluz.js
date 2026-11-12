'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaluz",
    "desc": "Apuesta coins a luz (gana x3).",
    "tipo": "apuesta",
    "theme": "luz",
    "titulo": "APUESTA: LUZ",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
