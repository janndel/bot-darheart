'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito1",
    "desc": "Intenta un delito: asaltaste un banco (5s).",
    "tipo": "delito",
    "delito": "asaltaste un banco",
    "emoji": "🏦",
    "titulo": "DELITO #1",
    "chance": 45,
    "min": 150,
    "max": 350,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
