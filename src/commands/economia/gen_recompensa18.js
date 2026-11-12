'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa18",
    "desc": "Abre regalo plata y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO PLATA",
    "lugar": "regalo plata",
    "min": 140,
    "max": 450,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
