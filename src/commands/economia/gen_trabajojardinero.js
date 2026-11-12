'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajojardinero",
    "desc": "Trabaja de jardinero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "jardinero",
    "lugar": "un jardín",
    "emoji": "🌿",
    "titulo": "TRABAJO: JARDINERO",
    "min": 140,
    "max": 280,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
