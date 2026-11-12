'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito30",
    "desc": "Intenta un delito: estafa por internet (5s).",
    "tipo": "delito",
    "delito": "estafa por internet",
    "emoji": "🌐",
    "titulo": "DELITO #30",
    "chance": 50,
    "min": 300,
    "max": 600,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
