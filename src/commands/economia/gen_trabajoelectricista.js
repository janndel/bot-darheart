'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoelectricista",
    "desc": "Trabaja de electricista y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "electricista",
    "lugar": "una instalación",
    "emoji": "💡",
    "titulo": "TRABAJO: ELECTRICISTA",
    "min": 100,
    "max": 220,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
