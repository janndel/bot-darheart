'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito36",
    "desc": "Intenta un delito: venta ilegal de datos (5s).",
    "tipo": "delito",
    "delito": "venta ilegal de datos",
    "emoji": "🗂️",
    "titulo": "DELITO #36",
    "chance": 60,
    "min": 300,
    "max": 500,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
