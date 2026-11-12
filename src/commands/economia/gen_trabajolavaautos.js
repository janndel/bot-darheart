'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajolavaautos",
    "desc": "Trabaja de lavaautos y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "lavaautos",
    "lugar": "un automóvil",
    "emoji": "🚿",
    "titulo": "TRABAJO: LAVAAUTOS",
    "min": 60,
    "max": 220,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
