'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito17",
    "desc": "Intenta un delito: defraudaste una tienda (5s).",
    "tipo": "delito",
    "delito": "defraudaste una tienda",
    "emoji": "🧾",
    "titulo": "DELITO #17",
    "chance": 45,
    "min": 270,
    "max": 350,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
