'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad13",
    "desc": "Pide limosna en la terminal (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la terminal",
    "min": 20,
    "max": 80,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
