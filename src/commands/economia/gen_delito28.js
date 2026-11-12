'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito28",
    "desc": "Intenta un delito: asalto a un camión (5s).",
    "tipo": "delito",
    "delito": "asalto a un camión",
    "emoji": "🚚",
    "titulo": "DELITO #28",
    "chance": 60,
    "min": 240,
    "max": 500,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
