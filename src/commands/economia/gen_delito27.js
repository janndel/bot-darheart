'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito27",
    "desc": "Intenta un delito: robo en una mansión (5s).",
    "tipo": "delito",
    "delito": "robo en una mansión",
    "emoji": "🏰",
    "titulo": "DELITO #27",
    "chance": 55,
    "min": 210,
    "max": 450,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
