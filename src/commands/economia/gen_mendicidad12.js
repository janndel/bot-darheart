'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad12",
    "desc": "Pide limosna en el estadio (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el estadio",
    "min": 50,
    "max": 180,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
