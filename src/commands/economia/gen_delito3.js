'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito3",
    "desc": "Intenta un delito: robaste una joyería (5s).",
    "tipo": "delito",
    "delito": "robaste una joyería",
    "emoji": "💎",
    "titulo": "DELITO #3",
    "chance": 55,
    "min": 210,
    "max": 450,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
