'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito25",
    "desc": "Intenta un delito: robo de celulares (5s).",
    "tipo": "delito",
    "delito": "robo de celulares",
    "emoji": "📱",
    "titulo": "DELITO #25",
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
