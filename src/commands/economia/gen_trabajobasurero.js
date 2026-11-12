'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajobasurero",
    "desc": "Trabaja de basurero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "basurero",
    "lugar": "la limpieza",
    "emoji": "🗑️",
    "titulo": "TRABAJO: BASURERO",
    "min": 140,
    "max": 220,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
