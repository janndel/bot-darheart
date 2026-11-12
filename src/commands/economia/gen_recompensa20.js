'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa20",
    "desc": "Abre regalo diamante y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO DIAMANTE",
    "lugar": "regalo diamante",
    "min": 200,
    "max": 550,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
