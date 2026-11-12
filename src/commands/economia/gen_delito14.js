'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito14",
    "desc": "Intenta un delito: vendiste cosas robadas (5s).",
    "tipo": "delito",
    "delito": "vendiste cosas robadas",
    "emoji": "🛒",
    "titulo": "DELITO #14",
    "chance": 50,
    "min": 180,
    "max": 600,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
