'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa14",
    "desc": "Abre caja diaria y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "CAJA DIARIA",
    "lugar": "caja diaria",
    "min": 170,
    "max": 600,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
