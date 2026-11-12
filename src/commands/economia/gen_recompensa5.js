'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa5",
    "desc": "Abre cofre oro y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE ORO",
    "lugar": "cofre oro",
    "min": 200,
    "max": 500,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
