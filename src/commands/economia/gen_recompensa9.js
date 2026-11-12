'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa9",
    "desc": "Abre cofre legendario y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE LEGENDARIO",
    "lugar": "cofre legendario",
    "min": 170,
    "max": 350,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
