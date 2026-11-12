'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito2",
    "desc": "Intenta un delito: robaste una tienda (5s).",
    "tipo": "delito",
    "delito": "robaste una tienda",
    "emoji": "🏪",
    "titulo": "DELITO #2",
    "chance": 50,
    "min": 180,
    "max": 400,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
