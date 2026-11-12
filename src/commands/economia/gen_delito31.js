'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito31",
    "desc": "Intenta un delito: robo de relojes (5s).",
    "tipo": "delito",
    "delito": "robo de relojes",
    "emoji": "⌚",
    "titulo": "DELITO #31",
    "chance": 55,
    "min": 150,
    "max": 650,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
