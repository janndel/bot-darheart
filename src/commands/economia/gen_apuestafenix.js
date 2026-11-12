'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestafenix",
    "desc": "Apuesta coins a fénix (gana x2).",
    "tipo": "apuesta",
    "theme": "fénix",
    "titulo": "APUESTA: FÉNIX",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
