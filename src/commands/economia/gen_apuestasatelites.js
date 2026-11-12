'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestasatelites",
    "desc": "Apuesta coins a satélites (gana x2).",
    "tipo": "apuesta",
    "theme": "satélites",
    "titulo": "APUESTA: SATÉLITES",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
