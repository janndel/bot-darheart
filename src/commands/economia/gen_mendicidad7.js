'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad7",
    "desc": "Pide limosna en el centro (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el centro",
    "min": 40,
    "max": 80,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
