'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajopescadero",
    "desc": "Trabaja de pescadero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "pescadero",
    "lugar": "una pescadería",
    "emoji": "🐟",
    "titulo": "TRABAJO: PESCADERO",
    "min": 80,
    "max": 220,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
