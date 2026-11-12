'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoalbanil",
    "desc": "Trabaja de albanil y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "albanil",
    "lugar": "una obra",
    "emoji": "🧱",
    "titulo": "TRABAJO: ALBANIL",
    "min": 100,
    "max": 160,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
