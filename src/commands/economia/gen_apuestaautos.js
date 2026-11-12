'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaautos",
    "desc": "Apuesta coins a autos (gana x2).",
    "tipo": "apuesta",
    "theme": "autos",
    "titulo": "APUESTA: AUTOS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
