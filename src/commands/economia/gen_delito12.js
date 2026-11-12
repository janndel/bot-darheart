'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito12",
    "desc": "Intenta un delito: extorsionaste a un comercio (5s).",
    "tipo": "delito",
    "delito": "extorsionaste a un comercio",
    "emoji": "😈",
    "titulo": "DELITO #12",
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
