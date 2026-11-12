'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito18",
    "desc": "Intenta un delito: robaste una bicicleta (5s).",
    "tipo": "delito",
    "delito": "robaste una bicicleta",
    "emoji": "🚲",
    "titulo": "DELITO #18",
    "chance": 50,
    "min": 300,
    "max": 400,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
