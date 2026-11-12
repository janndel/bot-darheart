'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa22",
    "desc": "Abre regalo lunar y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO LUNAR",
    "lugar": "regalo lunar",
    "min": 110,
    "max": 300,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
