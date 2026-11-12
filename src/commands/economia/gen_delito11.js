'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito11",
    "desc": "Intenta un delito: contrabandeaste mercancía (5s).",
    "tipo": "delito",
    "delito": "contrabandeaste mercancía",
    "emoji": "📦",
    "titulo": "DELITO #11",
    "chance": 55,
    "min": 270,
    "max": 450,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
