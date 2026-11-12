'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad6",
    "desc": "Pide limosna en la playa (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la playa",
    "min": 30,
    "max": 180,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
