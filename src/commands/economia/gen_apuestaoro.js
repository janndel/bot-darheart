'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaoro",
    "desc": "Apuesta coins a oro (gana x2).",
    "tipo": "apuesta",
    "theme": "oro",
    "titulo": "APUESTA: ORO",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
