'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa12",
    "desc": "Abre caja misteriosa y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "CAJA MISTERIOSA",
    "lugar": "caja misteriosa",
    "min": 110,
    "max": 500,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
