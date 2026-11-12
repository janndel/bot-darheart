'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito4",
    "desc": "Intenta un delito: robaste un auto (5s).",
    "tipo": "delito",
    "delito": "robaste un auto",
    "emoji": "🚗",
    "titulo": "DELITO #4",
    "chance": 60,
    "min": 240,
    "max": 500,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
