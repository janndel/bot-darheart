'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito37",
    "desc": "Intenta un delito: robo de bicicletas (5s).",
    "tipo": "delito",
    "delito": "robo de bicicletas",
    "emoji": "🚴",
    "titulo": "DELITO #37",
    "chance": 45,
    "min": 150,
    "max": 550,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
