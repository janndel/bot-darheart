'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestameteoros",
    "desc": "Apuesta coins a meteoros (gana x3).",
    "tipo": "apuesta",
    "theme": "meteoros",
    "titulo": "APUESTA: METEOROS",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
