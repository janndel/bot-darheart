'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoganadero",
    "desc": "Trabaja de ganadero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "ganadero",
    "lugar": "una finca",
    "emoji": "🐄",
    "titulo": "TRABAJO: GANADERO",
    "min": 100,
    "max": 220,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
