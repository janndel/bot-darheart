'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa28",
    "desc": "Abre regalo real y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO REAL",
    "lugar": "regalo real",
    "min": 140,
    "max": 600,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
