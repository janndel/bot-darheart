'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajocontador",
    "desc": "Trabaja de contador y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "contador",
    "lugar": "una oficina",
    "emoji": "🧮",
    "titulo": "TRABAJO: CONTADOR",
    "min": 80,
    "max": 160,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
