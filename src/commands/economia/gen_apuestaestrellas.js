'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaestrellas",
    "desc": "Apuesta coins a estrellas (gana x2).",
    "tipo": "apuesta",
    "theme": "estrellas",
    "titulo": "APUESTA: ESTRELLAS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
