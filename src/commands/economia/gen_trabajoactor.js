'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoactor",
    "desc": "Trabaja de actor y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "actor",
    "lugar": "una escena",
    "emoji": "🎬",
    "titulo": "TRABAJO: ACTOR",
    "min": 60,
    "max": 250,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
