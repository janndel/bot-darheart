'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajomecanico",
    "desc": "Trabaja de mecanico y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "mecanico",
    "lugar": "un taller",
    "emoji": "🔩",
    "titulo": "TRABAJO: MECANICO",
    "min": 60,
    "max": 310,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
