'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad27",
    "desc": "Pide limosna en el hospital (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el hospital",
    "min": 40,
    "max": 120,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
