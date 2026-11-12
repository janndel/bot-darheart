'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestatortuga",
    "desc": "Apuesta coins a tortuga (gana x3).",
    "tipo": "apuesta",
    "theme": "tortuga",
    "titulo": "APUESTA: TORTUGA",
    "chance": 33,
    "mult": 3,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
