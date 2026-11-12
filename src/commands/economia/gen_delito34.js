'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito34",
    "desc": "Intenta un delito: tráfico de influencias (5s).",
    "tipo": "delito",
    "delito": "tráfico de influencias",
    "emoji": "🤫",
    "titulo": "DELITO #34",
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
