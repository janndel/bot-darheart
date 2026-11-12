'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa19",
    "desc": "Abre regalo oro y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO ORO",
    "lugar": "regalo oro",
    "min": 170,
    "max": 500,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
