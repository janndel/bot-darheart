'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajopintor",
    "desc": "Trabaja de pintor y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "pintor",
    "lugar": "un cuadro",
    "emoji": "🎨",
    "titulo": "TRABAJO: PINTOR",
    "min": 100,
    "max": 310,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
