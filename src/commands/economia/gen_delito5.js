'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito5",
    "desc": "Intenta un delito: robaste una moto (5s).",
    "tipo": "delito",
    "delito": "robaste una moto",
    "emoji": "🏍️",
    "titulo": "DELITO #5",
    "chance": 45,
    "min": 270,
    "max": 550,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
