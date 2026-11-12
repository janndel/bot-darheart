'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad11",
    "desc": "Pide limosna en el museo (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el museo",
    "min": 40,
    "max": 160,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
