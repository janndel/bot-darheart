'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad26",
    "desc": "Pide limosna en la universidad (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la universidad",
    "min": 30,
    "max": 100,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
