'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajojoyero",
    "desc": "Trabaja de joyero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "joyero",
    "lugar": "una joya",
    "emoji": "💎",
    "titulo": "TRABAJO: JOYERO",
    "min": 80,
    "max": 340,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
