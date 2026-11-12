'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa2",
    "desc": "Abre cofre hierro y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "COFRE HIERRO",
    "lugar": "cofre hierro",
    "min": 110,
    "max": 350,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
