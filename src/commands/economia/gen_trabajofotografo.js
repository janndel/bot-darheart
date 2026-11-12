'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajofotografo",
    "desc": "Trabaja de fotografo y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "fotografo",
    "lugar": "una sesión",
    "emoji": "📸",
    "titulo": "TRABAJO: FOTOGRAFO",
    "min": 120,
    "max": 190,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
