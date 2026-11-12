'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito38",
    "desc": "Intenta un delito: estafa telefónica (5s).",
    "tipo": "delito",
    "delito": "estafa telefónica",
    "emoji": "📞",
    "titulo": "DELITO #38",
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
