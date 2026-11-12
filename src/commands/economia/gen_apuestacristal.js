'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestacristal",
    "desc": "Apuesta coins a cristal (gana x2).",
    "tipo": "apuesta",
    "theme": "cristal",
    "titulo": "APUESTA: CRISTAL",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
