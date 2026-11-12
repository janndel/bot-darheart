'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad15",
    "desc": "Pide limosna en la avenida (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en la avenida",
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
