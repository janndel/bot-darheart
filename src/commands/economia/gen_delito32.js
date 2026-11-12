'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito32",
    "desc": "Intenta un delito: contrabando de joyas (5s).",
    "tipo": "delito",
    "delito": "contrabando de joyas",
    "emoji": "💍",
    "titulo": "DELITO #32",
    "chance": 60,
    "min": 180,
    "max": 700,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
