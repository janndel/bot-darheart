'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa25",
    "desc": "Abre regalo secreto y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO SECRETO",
    "lugar": "regalo secreto",
    "min": 200,
    "max": 450,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
