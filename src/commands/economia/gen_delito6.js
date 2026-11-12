'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito6",
    "desc": "Intenta un delito: carterista (5s).",
    "tipo": "delito",
    "delito": "carterista",
    "emoji": "👜",
    "titulo": "DELITO #6",
    "chance": 50,
    "min": 300,
    "max": 600,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
