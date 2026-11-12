'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoprofesor",
    "desc": "Trabaja de profesor y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "profesor",
    "lugar": "una escuela",
    "emoji": "📚",
    "titulo": "TRABAJO: PROFESOR",
    "min": 100,
    "max": 340,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
