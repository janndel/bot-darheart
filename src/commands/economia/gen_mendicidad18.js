'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad18",
    "desc": "Pide limosna en el malecón (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el malecón",
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
