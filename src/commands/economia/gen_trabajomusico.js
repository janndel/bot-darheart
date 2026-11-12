'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajomusico",
    "desc": "Trabaja de musico y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "musico",
    "lugar": "un escenario",
    "emoji": "🎸",
    "titulo": "TRABAJO: MUSICO",
    "min": 80,
    "max": 280,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
