'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa27",
    "desc": "Abre regalo antiguo y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO ANTIGUO",
    "lugar": "regalo antiguo",
    "min": 110,
    "max": 550,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
