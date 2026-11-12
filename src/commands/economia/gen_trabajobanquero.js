'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajobanquero",
    "desc": "Trabaja de banquero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "banquero",
    "lugar": "un banco",
    "emoji": "🏦",
    "titulo": "TRABAJO: BANQUERO",
    "min": 60,
    "max": 340,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
