'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestahielo",
    "desc": "Apuesta coins a hielo (gana x2).",
    "tipo": "apuesta",
    "theme": "hielo",
    "titulo": "APUESTA: HIELO",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
