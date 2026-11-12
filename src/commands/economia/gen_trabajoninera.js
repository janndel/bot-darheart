'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoninera",
    "desc": "Trabaja de ninera y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "ninera",
    "lugar": "una casa",
    "emoji": "🍼",
    "titulo": "TRABAJO: NINERA",
    "min": 120,
    "max": 160,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
