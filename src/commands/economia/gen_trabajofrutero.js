'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajofrutero",
    "desc": "Trabaja de frutero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "frutero",
    "lugar": "un mercado",
    "emoji": "🍎",
    "titulo": "TRABAJO: FRUTERO",
    "min": 100,
    "max": 250,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
