'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestafuego",
    "desc": "Apuesta coins a fuego (gana x2).",
    "tipo": "apuesta",
    "theme": "fuego",
    "titulo": "APUESTA: FUEGO",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
