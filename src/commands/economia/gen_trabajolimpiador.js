'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajolimpiador",
    "desc": "Trabaja de limpiador y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "limpiador",
    "lugar": "una oficina",
    "emoji": "🧽",
    "titulo": "TRABAJO: LIMPIADOR",
    "min": 140,
    "max": 190,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
