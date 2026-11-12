'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaleon",
    "desc": "Apuesta coins a león (gana x2).",
    "tipo": "apuesta",
    "theme": "león",
    "titulo": "APUESTA: LEÓN",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
