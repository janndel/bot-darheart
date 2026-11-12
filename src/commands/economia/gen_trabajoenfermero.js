'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoenfermero",
    "desc": "Trabaja de enfermero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "enfermero",
    "lugar": "un hospital",
    "emoji": "💉",
    "titulo": "TRABAJO: ENFERMERO",
    "min": 140,
    "max": 250,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
