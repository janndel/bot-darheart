'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad24",
    "desc": "Pide limosna en el café (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el café",
    "min": 50,
    "max": 180,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
