'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito21",
    "desc": "Intenta un delito: hackeaste un cajero (5s).",
    "tipo": "delito",
    "delito": "hackeaste un cajero",
    "emoji": "🏧",
    "titulo": "DELITO #21",
    "chance": 45,
    "min": 210,
    "max": 550,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
