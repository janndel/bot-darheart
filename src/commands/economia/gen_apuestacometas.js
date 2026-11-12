'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestacometas",
    "desc": "Apuesta coins a cometas (gana x3).",
    "tipo": "apuesta",
    "theme": "cometas",
    "titulo": "APUESTA: COMETAS",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
