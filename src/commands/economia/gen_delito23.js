'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito23",
    "desc": "Intenta un delito: trampa en una apuesta (5s).",
    "tipo": "delito",
    "delito": "trampa en una apuesta",
    "emoji": "🎲",
    "titulo": "DELITO #23",
    "chance": 55,
    "min": 270,
    "max": 650,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
