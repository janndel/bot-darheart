'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestanebulosas",
    "desc": "Apuesta coins a nebulosas (gana x2).",
    "tipo": "apuesta",
    "theme": "nebulosas",
    "titulo": "APUESTA: NEBULOSAS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
