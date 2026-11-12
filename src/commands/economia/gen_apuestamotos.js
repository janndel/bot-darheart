'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestamotos",
    "desc": "Apuesta coins a motos (gana x2).",
    "tipo": "apuesta",
    "theme": "motos",
    "titulo": "APUESTA: MOTOS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
