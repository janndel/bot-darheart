'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa29",
    "desc": "Abre regalo mágico y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO MÁGICO",
    "lugar": "regalo mágico",
    "min": 170,
    "max": 300,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
