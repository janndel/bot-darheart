'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajomesero",
    "desc": "Trabaja de mesero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "mesero",
    "lugar": "un comedor",
    "emoji": "🍽️",
    "titulo": "TRABAJO: MESERO",
    "min": 100,
    "max": 310,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
