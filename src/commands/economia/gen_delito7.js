'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito7",
    "desc": "Intenta un delito: estafaste a un turista (5s).",
    "tipo": "delito",
    "delito": "estafaste a un turista",
    "emoji": "🧳",
    "titulo": "DELITO #7",
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
