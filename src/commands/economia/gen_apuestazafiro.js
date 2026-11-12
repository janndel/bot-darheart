'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestazafiro",
    "desc": "Apuesta coins a zafiro (gana x2).",
    "tipo": "apuesta",
    "theme": "zafiro",
    "titulo": "APUESTA: ZAFIRO",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
