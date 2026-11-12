'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad1",
    "desc": "Pide limosna en la plaza (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la plaza",
    "min": 20,
    "max": 80,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
