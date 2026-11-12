'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoabogado",
    "desc": "Trabaja de abogado y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "abogado",
    "lugar": "un caso",
    "emoji": "⚖️",
    "titulo": "TRABAJO: ABOGADO",
    "min": 100,
    "max": 190,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
