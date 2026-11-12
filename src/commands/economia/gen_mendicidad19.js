'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad19",
    "desc": "Pide limosna en la zona turística (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la zona turística",
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
