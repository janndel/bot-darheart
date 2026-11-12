'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestacarreras",
    "desc": "Apuesta coins a carreras (gana x2).",
    "tipo": "apuesta",
    "theme": "carreras",
    "titulo": "APUESTA: CARRERAS",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
