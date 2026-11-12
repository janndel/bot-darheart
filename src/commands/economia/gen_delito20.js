'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito20",
    "desc": "Intenta un delito: robaste gasolina (5s).",
    "tipo": "delito",
    "delito": "robaste gasolina",
    "emoji": "⛽",
    "titulo": "DELITO #20",
    "chance": 60,
    "min": 180,
    "max": 500,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
