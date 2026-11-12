'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito29",
    "desc": "Intenta un delito: robo de arte (5s).",
    "tipo": "delito",
    "delito": "robo de arte",
    "emoji": "🖼️",
    "titulo": "DELITO #29",
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
