'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa3",
    "desc": "Abre cofre bronce y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE BRONCE",
    "lugar": "cofre bronce",
    "min": 140,
    "max": 400,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
