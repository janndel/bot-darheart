'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito22",
    "desc": "Intenta un delito: vendiste entradas falsas (5s).",
    "tipo": "delito",
    "delito": "vendiste entradas falsas",
    "emoji": "🎟️",
    "titulo": "DELITO #22",
    "chance": 50,
    "min": 240,
    "max": 600,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
