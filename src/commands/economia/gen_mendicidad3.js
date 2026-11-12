'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad3",
    "desc": "Pide limosna en la estación (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la estación",
    "min": 40,
    "max": 120,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
