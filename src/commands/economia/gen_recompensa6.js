'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa6",
    "desc": "Abre cofre diamante y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE DIAMANTE",
    "lugar": "cofre diamante",
    "min": 80,
    "max": 550,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
