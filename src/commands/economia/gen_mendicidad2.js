'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad2",
    "desc": "Pide limosna en el mercado (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el mercado",
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
