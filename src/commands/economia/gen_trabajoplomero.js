'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoplomero",
    "desc": "Trabaja de plomero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "plomero",
    "lugar": "una tubería",
    "emoji": "🔧",
    "titulo": "TRABAJO: PLOMERO",
    "min": 120,
    "max": 250,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
