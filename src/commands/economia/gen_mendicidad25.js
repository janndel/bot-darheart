'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad25",
    "desc": "Pide limosna en la biblioteca (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la biblioteca",
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
