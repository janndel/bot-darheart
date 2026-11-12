'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaunicornio",
    "desc": "Apuesta coins a unicornio (gana x2).",
    "tipo": "apuesta",
    "theme": "unicornio",
    "titulo": "APUESTA: UNICORNIO",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
