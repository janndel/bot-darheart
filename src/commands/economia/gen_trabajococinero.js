'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajococinero",
    "desc": "Trabaja de cocinero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "cocinero",
    "lugar": "un restaurante",
    "emoji": "🍳",
    "titulo": "TRABAJO: COCINERO",
    "min": 80,
    "max": 280,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
