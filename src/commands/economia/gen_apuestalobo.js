'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestalobo",
    "desc": "Apuesta coins a lobo (gana x2).",
    "tipo": "apuesta",
    "theme": "lobo",
    "titulo": "APUESTA: LOBO",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
