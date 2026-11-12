'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad17",
    "desc": "Pide limosna en la feria (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la feria",
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
