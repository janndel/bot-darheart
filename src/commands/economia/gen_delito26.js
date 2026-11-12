'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito26",
    "desc": "Intenta un delito: falsificaste documentos (5s).",
    "tipo": "delito",
    "delito": "falsificaste documentos",
    "emoji": "📄",
    "titulo": "DELITO #26",
    "chance": 50,
    "min": 180,
    "max": 400,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
