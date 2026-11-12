'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad10",
    "desc": "Pide limosna en la iglesia (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la iglesia",
    "min": 30,
    "max": 140,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
