'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajodoctor",
    "desc": "Trabaja de doctor y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "doctor",
    "lugar": "un consultorio",
    "emoji": "🩺",
    "titulo": "TRABAJO: DOCTOR",
    "min": 120,
    "max": 220,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
