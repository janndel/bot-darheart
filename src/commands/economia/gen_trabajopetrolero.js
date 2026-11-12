'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajopetrolero",
    "desc": "Trabaja de petrolero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "petrolero",
    "lugar": "una plataforma",
    "emoji": "🛢️",
    "titulo": "TRABAJO: PETROLERO",
    "min": 60,
    "max": 160,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
