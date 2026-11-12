'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito24",
    "desc": "Intenta un delito: contrabando de café (5s).",
    "tipo": "delito",
    "delito": "contrabando de café",
    "emoji": "☕",
    "titulo": "DELITO #24",
    "chance": 60,
    "min": 300,
    "max": 700,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
