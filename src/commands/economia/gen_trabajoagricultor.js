'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoagricultor",
    "desc": "Trabaja de agricultor y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "agricultor",
    "lugar": "un campo",
    "emoji": "🌾",
    "titulo": "TRABAJO: AGRICULTOR",
    "min": 80,
    "max": 190,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
