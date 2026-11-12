'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa23",
    "desc": "Abre regalo solar y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO SOLAR",
    "lugar": "regalo solar",
    "min": 140,
    "max": 350,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
