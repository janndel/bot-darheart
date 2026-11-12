'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa17",
    "desc": "Abre regalo bronce y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO BRONCE",
    "lugar": "regalo bronce",
    "min": 110,
    "max": 400,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
