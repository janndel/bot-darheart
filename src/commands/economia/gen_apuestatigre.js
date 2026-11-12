'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestatigre",
    "desc": "Apuesta coins a tigre (gana x2).",
    "tipo": "apuesta",
    "theme": "tigre",
    "titulo": "APUESTA: TIGRE",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
