'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajotaxista",
    "desc": "Trabaja de taxista y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "taxista",
    "lugar": "la ciudad",
    "emoji": "🚖",
    "titulo": "TRABAJO: TAXISTA",
    "min": 100,
    "max": 280,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
