'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa16",
    "desc": "Abre caja mensual y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "CAJA MENSUAL",
    "lugar": "caja mensual",
    "min": 80,
    "max": 350,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
