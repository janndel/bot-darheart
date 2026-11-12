'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recompensa30",
    "desc": "Abre regalo legendario y gana coins (5s).",
    "tipo": "recompensa",
    "titulo": "REGALO LEGENDARIO",
    "lugar": "regalo legendario",
    "min": 200,
    "max": 350,
    "cooldown": 45,
    "campo": "lastRecompensaExtra",
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
