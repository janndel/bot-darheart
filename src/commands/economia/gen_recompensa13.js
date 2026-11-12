'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa13",
    "desc": "Abre caja premium y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "CAJA PREMIUM",
    "lugar": "caja premium",
    "min": 140,
    "max": 550,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
