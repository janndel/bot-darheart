'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad29",
    "desc": "Pide limosna en el hotel (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el hotel",
    "min": 20,
    "max": 160,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
