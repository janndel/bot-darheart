'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestabronce",
    "desc": "Apuesta coins a bronce (gana x2).",
    "tipo": "apuesta",
    "theme": "bronce",
    "titulo": "APUESTA: BRONCE",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
