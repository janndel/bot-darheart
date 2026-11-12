'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajorelojero",
    "desc": "Trabaja de relojero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "relojero",
    "lugar": "un reloj",
    "emoji": "⌚",
    "titulo": "TRABAJO: RELOJERO",
    "min": 100,
    "max": 160,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
