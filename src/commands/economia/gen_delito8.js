'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito8",
    "desc": "Intenta un delito: hackeaste una cuenta (5s).",
    "tipo": "delito",
    "delito": "hackeaste una cuenta",
    "emoji": "💻",
    "titulo": "DELITO #8",
    "chance": 60,
    "min": 180,
    "max": 700,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
