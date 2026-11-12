'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestahelado",
    "desc": "Apuesta coins a helado (gana x2).",
    "tipo": "apuesta",
    "theme": "helado",
    "titulo": "APUESTA: HELADO",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
