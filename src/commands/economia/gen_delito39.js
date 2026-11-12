'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito39",
    "desc": "Intenta un delito: contrabando de perfumes (5s).",
    "tipo": "delito",
    "delito": "contrabando de perfumes",
    "emoji": "🧴",
    "titulo": "DELITO #39",
    "chance": 55,
    "min": 210,
    "max": 650,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
