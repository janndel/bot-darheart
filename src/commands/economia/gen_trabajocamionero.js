'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajocamionero",
    "desc": "Trabaja de camionero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "camionero",
    "lugar": "la carretera",
    "emoji": "🚚",
    "titulo": "TRABAJO: CAMIONERO",
    "min": 60,
    "max": 160,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
