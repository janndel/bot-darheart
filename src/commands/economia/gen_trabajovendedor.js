'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajovendedor",
    "desc": "Trabaja de vendedor y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "vendedor",
    "lugar": "una tienda",
    "emoji": "🛍️",
    "titulo": "TRABAJO: VENDEDOR",
    "min": 120,
    "max": 280,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
