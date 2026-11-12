'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa7",
    "desc": "Abre cofre mágico y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE MÁGICO",
    "lugar": "cofre mágico",
    "min": 110,
    "max": 600,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
