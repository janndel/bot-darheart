'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestatiburon",
    "desc": "Apuesta coins a tiburón (gana x3).",
    "tipo": "apuesta",
    "theme": "tiburón",
    "titulo": "APUESTA: TIBURÓN",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
