'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa26",
    "desc": "Abre regalo sorpresa y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO SORPRESA",
    "lugar": "regalo sorpresa",
    "min": 80,
    "max": 500,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
