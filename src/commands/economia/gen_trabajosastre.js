'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajosastre",
    "desc": "Trabaja de sastre y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "sastre",
    "lugar": "un traje",
    "emoji": "🧵",
    "titulo": "TRABAJO: SASTRE",
    "min": 140,
    "max": 280,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
