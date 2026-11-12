'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa11",
    "desc": "Abre caja fuerte y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "CAJA FUERTE",
    "lugar": "caja fuerte",
    "min": 80,
    "max": 450,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
