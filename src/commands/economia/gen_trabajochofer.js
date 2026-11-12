'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajochofer",
    "desc": "Trabaja de chofer y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "chofer",
    "lugar": "una ruta",
    "emoji": "🚕",
    "titulo": "TRABAJO: CHOFER",
    "min": 80,
    "max": 250,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
