'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoheladero",
    "desc": "Trabaja de heladero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "heladero",
    "lugar": "una heladería",
    "emoji": "🍦",
    "titulo": "TRABAJO: HELADERO",
    "min": 140,
    "max": 160,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
