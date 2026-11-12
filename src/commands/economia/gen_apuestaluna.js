'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestaluna",
    "desc": "Apuesta coins a luna (gana x2).",
    "tipo": "apuesta",
    "theme": "luna",
    "titulo": "APUESTA: LUNA",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
