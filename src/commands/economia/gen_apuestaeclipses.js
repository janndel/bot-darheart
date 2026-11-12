'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaeclipses",
    "desc": "Apuesta coins a eclipses (gana x2).",
    "tipo": "apuesta",
    "theme": "eclipses",
    "titulo": "APUESTA: ECLIPSES",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
