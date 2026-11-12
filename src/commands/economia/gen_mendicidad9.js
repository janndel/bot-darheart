'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad9",
    "desc": "Pide limosna en el semáforo (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el semáforo",
    "min": 20,
    "max": 120,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
