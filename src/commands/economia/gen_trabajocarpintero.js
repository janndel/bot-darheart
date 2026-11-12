'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajocarpintero",
    "desc": "Trabaja de carpintero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "carpintero",
    "lugar": "un mueble",
    "emoji": "🪚",
    "titulo": "TRABAJO: CARPINTERO",
    "min": 80,
    "max": 340,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
