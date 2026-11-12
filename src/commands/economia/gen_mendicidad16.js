'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad16",
    "desc": "Pide limosna en el barrio (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el barrio",
    "min": 50,
    "max": 140,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
