'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad20",
    "desc": "Pide limosna en el vecindario (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el vecindario",
    "min": 50,
    "max": 100,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
