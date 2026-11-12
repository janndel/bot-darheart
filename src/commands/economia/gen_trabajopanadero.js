'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajopanadero",
    "desc": "Trabaja de panadero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "panadero",
    "lugar": "la panadería",
    "emoji": "🥖",
    "titulo": "TRABAJO: PANADERO",
    "min": 80,
    "max": 190,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
