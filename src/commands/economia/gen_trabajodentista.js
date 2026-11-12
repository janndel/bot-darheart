'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajodentista",
    "desc": "Trabaja de dentista y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "dentista",
    "lugar": "una clínica",
    "emoji": "🦷",
    "titulo": "TRABAJO: DENTISTA",
    "min": 60,
    "max": 280,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
