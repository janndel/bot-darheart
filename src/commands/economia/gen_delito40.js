'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito40",
    "desc": "Intenta un delito: robo de herramientas (5s).",
    "tipo": "delito",
    "delito": "robo de herramientas",
    "emoji": "🔧",
    "titulo": "DELITO #40",
    "chance": 60,
    "min": 240,
    "max": 700,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
