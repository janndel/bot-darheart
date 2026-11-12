'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad14",
    "desc": "Pide limosna en el puente (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el puente",
    "min": 30,
    "max": 100,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
