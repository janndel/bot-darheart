'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa21",
    "desc": "Abre regalo estelar y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO ESTELAR",
    "lugar": "regalo estelar",
    "min": 80,
    "max": 600,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
