'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestadragon",
    "desc": "Apuesta coins a dragón (gana x2).",
    "tipo": "apuesta",
    "theme": "dragón",
    "titulo": "APUESTA: DRAGÓN",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
