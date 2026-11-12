'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaserpiente",
    "desc": "Apuesta coins a serpiente (gana x2).",
    "tipo": "apuesta",
    "theme": "serpiente",
    "titulo": "APUESTA: SERPIENTE",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
