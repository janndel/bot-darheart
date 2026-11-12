'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito33",
    "desc": "Intenta un delito: robo de equipos (5s).",
    "tipo": "delito",
    "delito": "robo de equipos",
    "emoji": "🖥️",
    "titulo": "DELITO #33",
    "chance": 45,
    "min": 210,
    "max": 350,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
