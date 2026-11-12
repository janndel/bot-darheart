'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajodj",
    "desc": "Trabaja de dj y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "dj",
    "lugar": "una fiesta",
    "emoji": "🎧",
    "titulo": "TRABAJO: DJ",
    "min": 140,
    "max": 160,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
