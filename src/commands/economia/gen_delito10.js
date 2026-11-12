'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito10",
    "desc": "Intenta un delito: sobornaste a un guardia (5s).",
    "tipo": "delito",
    "delito": "sobornaste a un guardia",
    "emoji": "🤝",
    "titulo": "DELITO #10",
    "chance": 50,
    "min": 240,
    "max": 400,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
