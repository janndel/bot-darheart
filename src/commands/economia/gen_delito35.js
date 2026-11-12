'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito35",
    "desc": "Intenta un delito: robo de combustible (5s).",
    "tipo": "delito",
    "delito": "robo de combustible",
    "emoji": "🛢️",
    "titulo": "DELITO #35",
    "chance": 55,
    "min": 270,
    "max": 450,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
