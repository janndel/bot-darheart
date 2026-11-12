'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajopizzero",
    "desc": "Trabaja de pizzero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "pizzero",
    "lugar": "una pizzería",
    "emoji": "🍕",
    "titulo": "TRABAJO: PIZZERO",
    "min": 120,
    "max": 340,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
