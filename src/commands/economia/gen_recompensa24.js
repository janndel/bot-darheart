'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa24",
    "desc": "Abre regalo cósmico y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO CÓSMICO",
    "lugar": "regalo cósmico",
    "min": 170,
    "max": 400,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
