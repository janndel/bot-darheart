'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajobarrendero",
    "desc": "Trabaja de barrendero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "barrendero",
    "lugar": "la calle",
    "emoji": "🧹",
    "titulo": "TRABAJO: BARRENDERO",
    "min": 60,
    "max": 250,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
