'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestabicicletas",
    "desc": "Apuesta coins a bicicletas (gana x3).",
    "tipo": "apuesta",
    "theme": "bicicletas",
    "titulo": "APUESTA: BICICLETAS",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
