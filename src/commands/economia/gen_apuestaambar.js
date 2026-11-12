'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaambar",
    "desc": "Apuesta coins a ámbar (gana x2).",
    "tipo": "apuesta",
    "theme": "ámbar",
    "titulo": "APUESTA: ÁMBAR",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
