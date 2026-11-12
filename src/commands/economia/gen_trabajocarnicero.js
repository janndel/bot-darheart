'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajocarnicero",
    "desc": "Trabaja de carnicero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "carnicero",
    "lugar": "una carnicería",
    "emoji": "🥩",
    "titulo": "TRABAJO: CARNICERO",
    "min": 60,
    "max": 190,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
