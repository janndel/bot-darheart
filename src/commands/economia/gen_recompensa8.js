'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa8",
    "desc": "Abre cofre mítico y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE MÍTICO",
    "lugar": "cofre mítico",
    "min": 140,
    "max": 300,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
