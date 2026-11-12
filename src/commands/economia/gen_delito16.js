'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito16",
    "desc": "Intenta un delito: pirateaste una película (5s).",
    "tipo": "delito",
    "delito": "pirateaste una película",
    "emoji": "🎬",
    "titulo": "DELITO #16",
    "chance": 60,
    "min": 240,
    "max": 700,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
