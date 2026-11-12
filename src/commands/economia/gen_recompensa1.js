'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa1",
    "desc": "Abre cofre madera y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE MADERA",
    "lugar": "cofre madera",
    "min": 80,
    "max": 300,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
