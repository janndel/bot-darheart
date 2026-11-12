'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad4",
    "desc": "Pide limosna en la esquina (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la esquina",
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
