'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito19",
    "desc": "Intenta un delito: asalto a mano armada (5s).",
    "tipo": "delito",
    "delito": "asalto a mano armada",
    "emoji": "🔫",
    "titulo": "DELITO #19",
    "chance": 55,
    "min": 150,
    "max": 450,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
