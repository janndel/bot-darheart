'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa4",
    "desc": "Abre cofre plata y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE PLATA",
    "lugar": "cofre plata",
    "min": 170,
    "max": 450,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
