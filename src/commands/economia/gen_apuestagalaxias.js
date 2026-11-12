'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestagalaxias",
    "desc": "Apuesta coins a galaxias (gana x2).",
    "tipo": "apuesta",
    "theme": "galaxias",
    "titulo": "APUESTA: GALAXIAS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
