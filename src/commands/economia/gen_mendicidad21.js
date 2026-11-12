'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad21",
    "desc": "Pide limosna en la panadería (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la panadería",
    "min": 20,
    "max": 120,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
