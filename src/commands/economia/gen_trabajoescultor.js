'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoescultor",
    "desc": "Trabaja de escultor y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "escultor",
    "lugar": "una escultura",
    "emoji": "🗿",
    "titulo": "TRABAJO: ESCULTOR",
    "min": 120,
    "max": 340,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
