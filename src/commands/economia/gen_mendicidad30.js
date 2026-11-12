'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mendicidad30",
    "desc": "Pide limosna en el aeropuerto (5s).",
    "tipo": "mendicidad",
    "titulo": "LIMOSNA",
    "lugar": "en el aeropuerto",
    "min": 30,
    "max": 180,
    "fail": 15,
    "cooldown": 8,
    "campo": "lastMendigarExtra",
    "emoji": "🙏",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
