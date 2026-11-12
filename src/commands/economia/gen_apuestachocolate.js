'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestachocolate",
    "desc": "Apuesta coins a chocolate (gana x2).",
    "tipo": "apuesta",
    "theme": "chocolate",
    "titulo": "APUESTA: CHOCOLATE",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
