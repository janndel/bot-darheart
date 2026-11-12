'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaconstelaciones",
    "desc": "Apuesta coins a constelaciones (gana x2).",
    "tipo": "apuesta",
    "theme": "constelaciones",
    "titulo": "APUESTA: CONSTELACIONES",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
