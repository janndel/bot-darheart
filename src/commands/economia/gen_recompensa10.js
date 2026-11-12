'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa10",
    "desc": "Abre cofre común y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE COMÚN",
    "lugar": "cofre común",
    "min": 200,
    "max": 400,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
