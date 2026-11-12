'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apuestabeisbol",
    "desc": "Apuesta coins a béisbol (gana x2).",
    "tipo": "apuesta",
    "theme": "béisbol",
    "titulo": "APUESTA: BÉISBOL",
    "chance": 50,
    "mult": 2,
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
