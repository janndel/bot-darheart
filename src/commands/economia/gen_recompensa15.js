'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa15",
    "desc": "Abre caja semanal y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "CAJA SEMANAL",
    "lugar": "caja semanal",
    "min": 200,
    "max": 300,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
